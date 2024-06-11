const mongoose = require("mongoose");

const FaviconSchema = new mongoose.Schema(
  {
    favicon: {
      type: String,
      required: true,
    },
  },
  { timestamps: false }
);

const Favicon = mongoose.model("Favicon", FaviconSchema);

module.exports = Favicon;
