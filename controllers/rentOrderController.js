const RentOrder = require("../models/rentOrderModel");
const { calculatePagination } = require("../utils/calculatePagination");
const { pick } = require("../utils/pick");

exports.addRent = async (req, res) => {
  const data = req?.body;

  let invoiceNumber = "00001";

  try {
    const rents = await RentOrder.find({});

    if (rents?.length > 0) {
      rents?.map((rent) => {
        const newNumber = Math.max(parseInt(rent?.invoiceNumber)) + 1;

        if (newNumber < 10) {
          invoiceNumber = "0000" + newNumber;
        } else if (newNumber < 100) {
          invoiceNumber = "000" + newNumber;
        } else if (newNumber < 1000) {
          invoiceNumber = "00" + newNumber;
        } else if (newNumber < 10000) {
          invoiceNumber = "0" + newNumber;
        } else {
          invoiceNumber = newNumber;
        }
      });
    }

    const orderData = {
      ...data,
      invoiceNumber,
    };

    const result = await RentOrder.create(orderData);

    res.status(201).json({
      success: true,
      message: "RentOrder added successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getOrderById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const rentOrder = await RentOrder.findById(id).populate("product");

    res.status(200).json({
      success: true,
      message: "RentOrder fetched successfully",
      data: rentOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);

  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const orders = await RentOrder.find({})
      .populate("product")
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await RentOrder.countDocuments({});

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
      meta: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteOrderById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await RentOrder.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "RentOrder deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
