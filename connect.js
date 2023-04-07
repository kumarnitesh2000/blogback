const mongoose = require("mongoose");
const connectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("connectr", connectSchema);
