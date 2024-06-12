const {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  addRent,
} = require("../controllers/rentOrderController");

const router = require("express").Router();

router.post("/add", addRent);
router.get("/all", getAllOrders);
router.get("/:id", getOrderById);
router.delete("/:id", deleteOrderById);

module.exports = router;
