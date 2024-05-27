const express = require("express");
const { handleHttpError } = require("./utils/handleError");
const {
  getCars,
  getCar,
  createCars,
  updateCar,
  deleteCar,
} = require("../controllers/carsController");
const router = express.Router(); //  es el manejador de las rutas

router.get("/:id", getCar);
router.get("/", getCars);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);
router.post("/", createCars);

module.exports = router;
