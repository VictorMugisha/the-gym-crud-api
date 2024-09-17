const express = require("express")
const { createItem } = require("../controllers/item.controller")

const router = express.Router()

router.post('/', createItem)

module.exports = router