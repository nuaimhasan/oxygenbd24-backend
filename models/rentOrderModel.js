const mongoose = require("mongoose");

const RentOrderSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
    },
    shipping: {
      type: Object,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rent",
      required: true,
    },
  },
  { timestamps: true }
);

const RentOrder = mongoose.model("RentOrder", RentOrderSchema);

module.exports = RentOrder;
