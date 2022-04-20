const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//comparing entered password and user PW to make sure they match for auth
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//this func runs before we save
//we don't have to apply this to user Controller
userSchema.pre("save", async function (next) {
  //check that the password hasn't been modiefied so new hashed PW isn't created
  if (!this.isModified("password")) {
    next();
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
