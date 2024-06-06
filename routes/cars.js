const express = require("express");
const router = express.Router();
const { validatorCreateCar } = require("../validators/cars");
const {
  getCars,
  getCar,
  createCars,
  updateCar,
  deleteCar,
  deleteAllCars,
} = require("../controllers/carsController");

router.get("/", getCars);
router.get("/:id", getCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);
router.post("/", validatorCreateCar, createCars);
router.delete("/", deleteAllCars);

module.exports = router;
