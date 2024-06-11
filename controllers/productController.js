const Product = require("../models/productModel");
const fs = require("fs");
const { pick } = require("../utils/pick");
const { calculatePagination } = require("../utils/calculatePagination");
const { default: slugify } = require("slugify");

exports.addProduct = async (req, res) => {
  const image = req?.file?.filename;
  const data = req?.body;

  if (!image) {
    return res.status(400).json({
      success: false,
      error: "Image is required",
    });
  }

  try {
    const slug = slugify(data?.title);
    const product = {
      ...data,
      image,
      slug,
    };

    const result = await Product.create(product);

    res.status(200).json({
      success: true,
      message: "Product added successfully",
      data: result,
    });
  } catch (err) {
    fs.unlink(`./uploads/products/${image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  const paginationOptions = pick(req.query, ["page", "limit"]);

  const { page, limit, skip } = calculatePagination(paginationOptions);

  try {
    const result = await Product.find().skip(skip).limit(limit);

    let products = result;

    const total = products?.length;

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
      meta: {
        total,
        page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  const id = req?.params?.id;

  try {
    const result = await Product.findById(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const id = req?.params?.id;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    fs.unlink(`./uploads/products/${product?.image}`, (err) => {
      if (err) {
        console.error(err);
      }
    });

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.file?.filename;
  const { title, description, price } = req?.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (image) {
      fs.unlink(`./uploads/products/${product?.image}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      await Product.findByIdAndUpdate(
        id,
        {
          title,
          description,
          image,
          price,
        },
        {
          new: true,
        }
      );
    } else {
      await Product.findByIdAndUpdate(
        id,
        {
          title,
          description,
          price,
        },
        {
          new: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
