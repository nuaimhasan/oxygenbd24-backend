const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAboutUs,
  updateAboutUs,
  createAboutUs,
} = require("../controllers/aboutControllers");
const verifyToken = require("../middleware/verifyToken");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/aboutus");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/", getAboutUs);
router.post("/add", verifyToken, upload.single("image"), createAboutUs);
router.patch("/update/:id", verifyToken, upload.single("image"), updateAboutUs);

module.exports = router;
