const { carsModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const getCars = async (req, res) => {
  try {
    const data = await carsModel.find(); // Aquí debe ser "find()" sin argumentos
    console.log("Vehículos de Mongo -->", data);
    res.send({ data });
  } catch (error) {
    console.log("ERROR_GET_CARS -->", error);
    handleHttpError(res, "ERROR_GET_CARS", error);
  }
};

const getCar = async (req, res) => {
  try {
    const { id } = req.params;
    const carId = await carsModel.findById(id); // Aquí debe ser "find()" sin argumentos
    console.log("Vehículos de Mongo -->", carId);
    res.send({ carId });
  } catch (error) {
    console.log("ERROR_GET_CAR_ID -->", error);
    handleHttpError(res, "ERROR_GET_CAR_ID", error);
  }
};

const createCars = async (req, res) => {
  try {
  } catch (error) {}
};

const updateCar = async (req, res) => {
  try {
  } catch (error) {}
};

const deleteCar = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = { getCars, getCar, createCars, updateCar, deleteCar };
