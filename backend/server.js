const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const path = require("path");

//this is where we hide stuff
dotenv.config();

//mongoDB init
connectDB();

//init express
const app = express();
const PORT = process.env.PORT || 8000;

//this will allow us to use json data in the body
//for instance, in userController we want to get the body data which is in json format
app.use(express.json());

//use routes from productRoutes.js
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

//connect to paypal
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//make uploads folder static
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

//error handler for "not found" or 404,
app.use(notFound);

//error middleware
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("api is running");
});

app.listen(PORT, console.log(`Server running on port: ${PORT}`.yellow.bold));
