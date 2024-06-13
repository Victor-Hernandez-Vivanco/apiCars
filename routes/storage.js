const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { validatorGetItem } = require("../validators/storage");
const checkRole = require("../middleware/rol");
const authMiddleware = require("../middleware/session");
const {
  getItems,
  getItem,
  createItem,
  deleteItem,
  deleteAllItems,
} = require("../controllers/storageController");

router.post(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  uploadMiddleware.single("myfile"),
  createItem
);
router.get("/", authMiddleware, checkRole(["admin"]), getItems);
router.get(
  "/:id",
  authMiddleware,
  checkRole(["user", "admin"]),
  validatorGetItem,
  getItem
);
router.delete(
  "/:id",
  authMiddleware,
  checkRole(["admin"]),
  validatorGetItem,
  deleteItem
);
router.delete("/", authMiddleware, checkRole(["admin"]), deleteAllItems);

module.exports = router;
