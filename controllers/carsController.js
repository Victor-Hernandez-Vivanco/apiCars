const { carsModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const crypto = require("crypto");

const getCars = async (req, res) => {
  try {
    const user = req.user;
    const data = await carsModel.find();
    res.send({ user, data });
  } catch (error) {
    console.log("ERROR_GET_CARS -->", error);
    handleHttpError(res, "ERROR_GET_CARS", error);
  }
};

const getCar = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const carId = await carsModel.findById(id);
    res.send({ user, carId });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_CAR_ID", error);
  }
};

const createCar = async (req, res) => {
  try {
    const user = req.user;
    const carData = req.body;

    // Verificar que todos los campos requeridos están presentes
    const requiredFields = [
      "make",
      "model",
      "year",
      "color",
      "mileage",
      "price",
      "fuelType",
      "transmission",
      "engine",
      "horsepower",
      "features",
      "owners",
    ];

    for (const field of requiredFields) {
      if (!carData[field]) {
        return res
          .status(400)
          .send({ error: `Missing required field: ${field}` });
      }
    }

    // Crear una clave única basada en los atributos del vehículo
    const uniqueKey = crypto
      .createHash("md5")
      .update(
        `${carData.make}-${carData.model}-${carData.year}-${carData.color}-${carData.mileage}-${carData.price}-${carData.fuelType}-${carData.transmission}-${carData.engine}-${carData.horsepower}-${carData.features}-${carData.owners}`
      )
      .digest("hex");

    carData.uniqueKey = uniqueKey;

    const newCar = await carsModel.create(carData);
    res.status(201).send({ user, newCar });
  } catch (error) {
    console.error("ERROR_CREATE_CAR -->", error);

    if (error.code === 11000) {
      return res
        .status(409)
        .send({ error: "Duplicate entry. This car already exists." });
    } else {
      return handleHttpError(res, "ERROR_CREATE_CAR", 500);
    }
  }
};

const updateCar = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const carUp = await carsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({ user, carUp });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_CAR_ID", error);
  }
};

const deleteCar = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const datafile = await carsModel.findById(id);
    await carsModel.delete({ _id: id });
    if (!datafile) {
      return res.status(404).send({ message: "Car not found" });
    }
    res.status(200).send({ user, message: `Car deleted --> ${id}`, datafile });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_CAR", error);
  }
};

const deleteAllCars = async (req, res) => {
  try {
    const user = req.user;
    await carsModel.deleteMany({});
    res.status(200).send({ user, message: "All vehicles deleted" });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ALL_CARS", error);
  }
};

module.exports = {
  getCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
  deleteAllCars,
};
