const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  phone: String,
  address: String,
});

module.exports = mongoose.model("Student", StudentSchema);
