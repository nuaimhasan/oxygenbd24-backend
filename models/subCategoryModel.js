const mongoose = require("mongoose");

const subCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Categories",
    },
    subSubCategories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SubSubCategory",
      },
    ],
  },
  { timestamps: false }
);

const SubCategory = mongoose.model("SubCategory", subCategoriesSchema);

module.exports = SubCategory;
