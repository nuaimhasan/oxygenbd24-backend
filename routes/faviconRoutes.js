const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  addFavicon,
  getFavicon,
  updateFavicon,
} = require("../controllers/logoController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/logo");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.get("/all", getFavicon);
router.post("/add", upload.single("favicon"), addFavicon);
router.patch("/update/:id", upload.single("favicon"), updateFavicon);

module.exports = router;
