const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const productRoutes = require("./routes/productRoutes");

//this is where we hide stuff
dotenv.config();

//mongoDB init
connectDB();

//init express
const app = express();
const PORT = process.env.PORT || 8000;

//use routes from productRoutes.js
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("api is running");
});

app.listen(PORT, console.log(`Server running on port: ${PORT}`.yellow.bold));
