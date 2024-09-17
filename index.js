const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const itemRoutes = require("./routes/item.route")

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

connectDB();

app.use(express.json());

app.use("/items", itemRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
