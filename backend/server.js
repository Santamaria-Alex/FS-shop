const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

//this is where we hide stuff
dotenv.config();

//mongoDB init
connectDB();

//init express
const app = express();
const PORT = process.env.PORT || 8000;

//use routes from productRoutes.js
app.use("/api/products", productRoutes);

//error handler for "not found" or 404,
app.use(notFound);

//error middleware
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("api is running");
});

app.listen(PORT, console.log(`Server running on port: ${PORT}`.yellow.bold));
