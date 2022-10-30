const mongoose = require("mongoose");

const TeacherScheme = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    unique: true,
  },
  age: {
    required: true,
    type: Number,
  },
  subject: {
    required: true,
    type: String,
  },
  count: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Teacher", TeacherScheme);
