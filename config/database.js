const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_LOCAL_URI, {})
    .then((connection) => {
      console.log(
        `MongoDB Database connected with HOST: ${connection.connection.host}`
      );
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
      process.exit(1); // Exit the process with failure
    });
};

module.exports = connectDatabase;
