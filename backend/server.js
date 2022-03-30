const express = require("express");
const dotenv = require("dotenv");
const products = require("./data/products");
const connectDB = require("./config/db");
const colors = require("colors");

dotenv.config();

//mongoDB init
connectDB();

//init express
const app = express();
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("api is running");
});

//get all products from products.js
app.get("/api/products", (req, res) => {
  res.json(products);
});

//get single product based on id from products.js
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);

  res.json(product);
});

app.listen(PORT, console.log(`Server running on port: ${PORT}`.yellow.bold));
