const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connectDB() {
  try {
    const mongoConnection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB at ${mongoConnection.connection.host}`);
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

module.exports = connectDB;
