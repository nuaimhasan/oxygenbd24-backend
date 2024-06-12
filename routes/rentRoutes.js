const {
  addRent,
  getRent,
  updateRent,
  deleteRent,
  getRentById,
} = require("../controllers/rentController");

const router = require("express").Router();

router.get("/all", getRent);
router.post("/add", addRent);
router.get("/:id", getRentById);
router.patch("/edit/:id", updateRent);
router.delete("/delete/:id", deleteRent);

module.exports = router;
