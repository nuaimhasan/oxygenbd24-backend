const mongoose = require("mongoose");

const RentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    weight: {
      type: String,
      required: true,
    },
    pressure: {
      type: String,
      required: true,
    },
    backup: {
      type: String,
      required: true,
    },
    features: {
      type: Array,
    },
  },
  { timestamps: false }
);

const Rent = mongoose.model("Rent", RentSchema);

module.exports = Rent;
