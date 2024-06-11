const fs = require("fs");
const Logo = require("../models/logoModel");
const Favicon = require("../models/faviconModel");

exports.addLogo = async (req, res) => {
  try {
    const logo = {
      logo: req?.file?.filename,
    };

    const result = await Logo.create(logo);
    // console.log(result);

    res.status(200).json({
      success: true,
      message: "Logo added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getLogos = async (req, res) => {
  try {
    const logo = await Logo.find({});

    if (!logo) {
      return res.status(404).json({
        success: false,
        error: "Logo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Logo found successfully",
      data: logo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateLogo = async (req, res) => {
  try {
    const logo = req?.file?.filename;
    if (!logo) {
      return res.status(400).json({
        success: false,
        error: "Logo is required",
      });
    }

    const id = req?.params?.id;
    const isLogo = await Logo.findOne({ _id: id });

    if (isLogo) {
      await Logo.findByIdAndUpdate(id, { logo: logo }, { new: true });

      fs.unlink(`./uploads/logo/${isLogo?.logo}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(200).json({
        success: true,
        message: "Logo updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//-------------------Favicon----------------------

exports.addFavicon = async (req, res) => {
  try {
    const favicon = {
      favicon: req?.file?.filename,
    };

    const result = await Favicon.create(favicon);

    res.status(200).json({
      success: true,
      message: "Favicon added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getFavicon = async (req, res) => {
  try {
    const favicon = await Favicon.find({});

    if (!favicon) {
      return res.status(404).json({
        success: false,
        error: "Favicon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Favicon found successfully",
      data: favicon,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateFavicon = async (req, res) => {
  try {
    const favicon = req?.file?.filename;
    if (!favicon) {
      return res.status(400).json({
        success: false,
        error: "Favicon is required",
      });
    }

    const id = req?.params?.id;
    const isFavicon = await Favicon.findOne({ _id: id });

    if (isFavicon) {
      await Favicon.findByIdAndUpdate(id, { favicon: favicon }, { new: true });

      fs.unlink(`./uploads/logo/${isFavicon?.favicon}`, (err) => {
        if (err) {
          console.error(err);
        }
      });

      res.status(200).json({
        success: true,
        message: "Favicon updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
