const {
  addOrder,
  getAllOrders,
  getOrderById,
  deleteOrderById,
  updateStatus,
} = require("../controllers/orderController");

const router = require("express").Router();

router.post("/add", addOrder);
router.get("/all", getAllOrders);
router.get("/:id", getOrderById);

router.delete("/:id", deleteOrderById);

router.patch("/update-status/:id", updateStatus);

module.exports = router;
