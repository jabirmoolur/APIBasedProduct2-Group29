const express = require("express");
const router = express.Router({ mergeParams: true });
const { getAllMenus, createMenu, deleteMenu } = require("../controllers/menuController");

router.get("/", getAllMenus);   // Handle GET request to fetch all menus
router.post("/", createMenu);   // Handle POST request to create a new menu
router.delete("/:menuId", deleteMenu);  // Handle DELETE request to delete a menu by ID

module.exports = router;
