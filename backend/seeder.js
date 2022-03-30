const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const users = require("./data/users");
const products = require("./data/products");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

//everythingn in mongoose returns a promise so we always have to use async await
const importData = async () => {
  try {
    await Order.deleteMany(); //not passing an arg. means it'll del everything
    await Product.deleteMany();
    await User.deleteMany();

    //this will be an array of the created users
    //this admin user will be the object id for all the products
    const createdUsers = await User.insertMany(users); //inserting data from users

    //get first item in users.js which is the admin
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      //change the product's user to be the admin
      return { ...product, user: adminUser };
    });

    //add all data including adminUser
    await Product.insertMany(sampleProducts);

    console.log("Data Imported".green.inverse);
    process.exit(); //not sure what this does
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); //exiting with failure (1)
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany(); //not passing an arg. means it'll del everything
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed".red.inverse);
    process.exit(); //not sure what this does
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); //exiting with failure (1)
  }
};

//process.argv[2] refers to what's called in the command line at the end? in this case the "-d"
//>>command line:
//>> node backend/server -d
//added script to package.json, can run w npm run data:import
//or npm run data:destroy
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
