const express = require("express");
const router = express.Router();
const { validatorCreateCar } = require("../validators/cars");
const authMiddleware = require("../middleware/session");
const checkRole = require("../middleware/rol");
const {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
  deleteAllCars,
} = require("../controllers/carsController");

router.get("/", authMiddleware, checkRole(["admin"]), getCars);
router.get("/:id", authMiddleware, checkRole(["user", "admin"]), getCar);
router.put("/:id", authMiddleware, checkRole(["user", "admin"]), updateCar);
router.delete("/:id", authMiddleware, checkRole(["admin"]), deleteCar);
router.post(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  validatorCreateCar,
  createCar
);
router.delete("/", authMiddleware, checkRole(["admin"]), deleteAllCars);

module.exports = router;
