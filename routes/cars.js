const express = require("express");
const router = express.Router();
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
router.post("/", createCars);
router.delete("/", deleteAllCars);

module.exports = router;
