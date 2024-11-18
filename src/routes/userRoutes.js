const express = require("express");
const router = express.Router();
const { admin, manager, user } = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");
const authorizeRoles = require("../middlewares/rolesmiddleware");

router.get(
    "/admin", 
    verifyToken, 
    authorizeRoles("admin"), 
    admin
);
router.get(
  "/manager",
  verifyToken,
  authorizeRoles("admin", "manager"),
  manager
);
router.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "manager", "user"),
  user
);

module.exports = router;
