const express = require("express")
const { createItem, getAllItems } = require("../controllers/item.controller");

const router = express.Router()

router.post('/', createItem)
router.get('/', getAllItems)

module.exports = router