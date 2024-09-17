const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
