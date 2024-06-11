const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addBanner,
  allBanners,
  updateBanner,
} = require("../controllers/bannerController");
const verifyToken = require("../middleware/verifyToken");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/banner");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/all", allBanners);
router.post("/add", verifyToken, upload.single("image"), addBanner);
router.patch("/update/:id", verifyToken, upload.single("image"), updateBanner);

module.exports = router;
