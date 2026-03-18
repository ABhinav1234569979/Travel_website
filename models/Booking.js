const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    destinationName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    travelDate: {
      type: String,
      required: true
    },
    travelers: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
