const mongoose = require("mongoose");

const CompanyProfileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const CompanyProfile = mongoose.model("CompanyProfile", CompanyProfileSchema);

module.exports = CompanyProfile;
