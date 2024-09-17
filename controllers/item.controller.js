const ItemModel = require("../models/item.model");

async function createItem(req, res) {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const item = new ItemModel({ name, description, price });
    await item.save();
    res.status(201).json({ item });
  } catch (error) {
    console.log("Error in createItem controller: ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { createItem };
