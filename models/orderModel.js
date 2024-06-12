const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
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
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
