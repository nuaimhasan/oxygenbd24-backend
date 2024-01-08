const {
  addAdministrator,
  adminLogin,
  deleteAdmin,
  getAdmins,
  getLoggedAdmin,
} = require("../controllers/administratorController");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();

router.post("/add", addAdministrator);
router.post("/login", adminLogin);
router.get("/all", getAdmins);
router.get("/loggedUser", verifyToken, getLoggedAdmin);

router.delete("/:id", verifyToken, deleteAdmin);

module.exports = router;
