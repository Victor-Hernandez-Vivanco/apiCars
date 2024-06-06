const { carsModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const crypto = require("crypto");

const getCars = async (req, res) => {
  try {
    const data = await carsModel.find();
    res.send({ data });
  } catch (error) {
    console.log("ERROR_GET_CARS -->", error);
    handleHttpError(res, "ERROR_GET_CARS", error);
  }
};

const getCar = async (req, res) => {
  try {
    const { id } = req.params;
    const carId = await carsModel.findById(id);
    res.send({ carId });
  } catch (error) {
    console.log("ERROR_GET_CAR_ID -->", error);
    handleHttpError(res, "ERROR_GET_CAR_ID", error);
  }
};

const createCars = async (req, res) => {
  try {
    const carData = req.body;

    // Crear una clave única basada en los atributos del vehículo
    const uniqueKey = crypto
      .createHash("md5")
      .update(
        `${carData.make}-${carData.model}-${carData.year}-${carData.color}-${carData.mileage}-${carData.price}-${carData.fuelType}-${carData.transmission}-${carData.engine}-${carData.horsepower}-${carData.features}-${carData.owners}`
      )
      .digest("hex");

    carData.uniqueKey = uniqueKey;

    const newCar = await carsModel.create(carData);
    res.status(201).send(newCar);
  } catch (error) {
    console.log("ERROR_CREATE_CAR -->", error);
    handleHttpError(res, "ERROR_CREATE_CAR", 500);
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const carUp = await carsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({ carUp });
  } catch (error) {
    handleHttpError(res, "ERROR_UPDATE_CAR_ID", error);
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    await carsModel.findByIdAndDelete(id);
    res.status(201).send(`Car deleted --> ${id}`);
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_CAR", error);
  }
};

const deleteAllCars = async (req, res) => {
  try {
    await carsModel.deleteMany({});
    res.send({ message: "All vehicles deleted" });
  } catch (error) {
    console.log("ERROR_DELETE_ALL_CARS -->", error);
    handleHttpError(res, "ERROR_DELETE_ALL_CARS", error);
  }
};

module.exports = {
  getCars,
  getCar,
  createCars,
  updateCar,
  deleteCar,
  deleteAllCars,
};
