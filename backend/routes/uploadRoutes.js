const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");

//path.extname is looiking for the extension of the file name, ie: jpg or png
//this comes from multer docs
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//validating the type of image/extension
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  //check to see if the file contains jpg jpeg or png
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = router;
