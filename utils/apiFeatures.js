class APIFeatures {
  constructor(query, queryString) {
    this.query = query; // The query object
    this.queryStr = queryString; // The query parameters from the request
  }

  // Search feature
  search() {
    if (this.queryStr.keyword) {
      const keyword = {
        name: {
          $regex: this.queryStr.keyword, // Search using regular expressions
          $options: "i", // Case-insensitive
        },
      };
      this.query = this.query.find({ ...keyword });
    }
    return this;
  }

  // Filtering feature
  filter() {
    const queryCopy = { ...this.queryStr };

    // Fields to exclude from filtering
    const excludeFields = ["keyword", "sortBy", "page"];
    excludeFields.forEach((field) => delete queryCopy[field]);

    // Advanced filtering for numeric comparisons
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr));

    // Sorting based on query parameter
    if (this.queryStr.sortBy) {
      const sortBy = this.queryStr.sortBy.toLowerCase();
      let sortQuery = {};

      if (sortBy === "ratings") sortQuery = { ratings: -1 }; // Descending order
      else if (sortBy === "reviews") sortQuery = { numOfReviews: -1 }; // Descending order

      this.query = this.query.sort(sortQuery);
    }
    return this;
  }

  // Pagination feature
  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1; // Current page number
    const skip = resultsPerPage * (currentPage - 1); // Items to skip

    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
