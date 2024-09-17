const express = require("express")
const {
  createItem,
  getAllItems,
  getSingleItem,
} = require("../controllers/item.controller");

const router = express.Router()

router.post('/', createItem)
router.get('/', getAllItems)
router.get('/:id', getSingleItem)

module.exports = router