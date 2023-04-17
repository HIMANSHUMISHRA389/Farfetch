const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(
  "mongodb+srv://manish9427:manish9427@cluster0.ziljump.mongodb.net/?retryWrites=true&w=majority"
);
module.exports = { connection };
