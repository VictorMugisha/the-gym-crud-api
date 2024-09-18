const ItemModel = require("../models/item.model");
const mongoose = require("mongoose");

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

async function getAllItems(req, res) {
  try {
    const items = await ItemModel.find();
    res.status(200).json({ items });
  } catch (error) {
    console.log("Error in getAllItems controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getSingleItem(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const item = await ItemModel.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ item });
  } catch (error) {
    console.log("Error in getSingleItem controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateItem(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const allowedToUpdate = ["name", "description", "price"];
    const providedFields = {};

    for (const field of Object.keys(req.body)) {
      if (allowedToUpdate.includes(field)) {
        providedFields[field] = req.body[field];
      }
    }

    if (Object.keys(providedFields).length === 0) {
      return res.status(400).json({ message: "Invalid fields provided" });
    }

    const item = await ItemModel.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const updatedItem = await ItemModel.findByIdAndUpdate(id, providedFields, {
      new: true,
    });

    if (!updatedItem) {
      return res
        .status(500)
        .json({ message: "Could not update item. Try again!" });
    }

    res.status(200).json({ updatedItem });
  } catch (error) {
    console.log("Error in updateItem controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteItem(req, res) {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid id provided" });
    }

    const item = await ItemModel.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found!" });
    }

    const deletedItem = await ItemModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(400).json({ message: "Could not delete item" });
    }
    
    return res.status(204).json({});
  } catch (error) {
    console.log("Error in deleteItem controller: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createItem,
  getAllItems,
  getSingleItem,
  updateItem,
  deleteItem,
};
