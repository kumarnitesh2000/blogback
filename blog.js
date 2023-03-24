const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  writer: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  }
});

module.exports = mongoose.model("blogr", blogSchema);
