const fs = require("fs");
const Banner = require("../models/bannerModel");

exports.addBanner = async (req, res) => {
  try {
    const image = req?.file?.filename;

    if (!image) {
      return res.status(400).json({
        success: false,
        error: "banner image is required",
      });
    }

    const banner = {
      image: image,
      ...req?.body,
    };

    const result = await Banner.create(banner);

    res.status(200).json({
      success: true,
      message: "Banner created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.allBanners = async (req, res) => {
  try {
    const banners = await Banner.find({});

    res.status(200).json({
      success: true,
      message: "Banner get success",
      data: banners,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateBanner = async (req, res) => {
  const id = req?.params?.id;
  const image = req?.file?.filename;
  const data = req?.body;

  try {
    const isExist = await Banner.findById(id);

    if (!isExist) {
      return res.status(404).json({
        success: false,
        error: "Banner not found",
      });
    }

    let newData;

    if (image) {
      fs.unlink(`./uploads/banner/${isExist?.image}`, (err) => {
        if (err) {
          console.log(err);
        }
      });

      newData = {
        ...data,
        image,
      };
    } else {
      newData = { ...data };
    }

    const result = await Banner.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "Banner not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "Banner updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
