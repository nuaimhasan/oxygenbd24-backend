const Rent = require("../models/rentModel");

exports.addRent = async (req, res) => {
  try {
    const result = await Rent.create(req.body);

    res.status(200).json({
      success: true,
      message: "Rent add successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getRent = async (req, res) => {
  try {
    const rents = await Rent.find({});

    res.status(200).json({
      success: true,
      message: "All Rent get success",
      data: rents,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getRentById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Rent.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Rent not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Rent fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateRent = async (req, res) => {
  const id = req?.params?.id;
  const data = req?.body;

  try {
    const contact = await Rent.findById(id);

    if (!contact) {
      return res.status(400).json({
        success: false,
        error: "Rent not found",
      });
    }

    await Rent.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      success: true,
      message: "update success",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteRent = async (req, res) => {
  try {
    const id = req?.params?.id;

    const rent = await Rent.findById(id);

    if (!rent) {
      return res.status(404).json({
        success: false,
        message: "Rent not found",
      });
    }

    await Rent.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Rent deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
