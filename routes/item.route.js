const express = require("express");
const {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
} = require("../controllers/item.controller");

const router = express.Router();

router.post("/", createItem);
router.get("/", getAllItems);
router.get("/:id", getSingleItem);
router.put("/:id", updateItem);

module.exports = router;
