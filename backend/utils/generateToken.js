const jwt = require("jsonwebtoken");

//the ID is gonna be the payload for this token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { generateToken };
