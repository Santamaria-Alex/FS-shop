const express = require("express");
const products = require("./data/products");

//init express
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("api is running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);

  res.json(product);
});

app.listen(port, console.log(`Server running on port: ${port}`));
