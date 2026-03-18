const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: String,
  price: Number,
  image: String,
  description: String,
  category: String,
  days: Number,
  rating: Number
});

module.exports = mongoose.model("Destination", destinationSchema);
