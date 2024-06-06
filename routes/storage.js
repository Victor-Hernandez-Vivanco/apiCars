const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage");
const { validatorGetItem } = require("../validators/storage");
const {
  getItems,
  getItem,
  createItem,
  deleteItem,
  deleteAllItems,
} = require("../controllers/storageController");

router.post("/", uploadMiddleware.single("myfile"), createItem);
router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.delete("/:id", validatorGetItem, deleteItem);
router.delete("/", deleteAllItems);

module.exports = router;
