const axios = require("axios");
const crypto = require("crypto");
const path = require("path");
const Car = require(path.resolve(__dirname, "../models/cars"));

const getCars = async (req, res) => {
  try {
    const response = await axios.get(process.env.API_URL);
    const data = response.data;

    const carsToInsert = [];

    for (const carData of data) {
      const uniqueKey = crypto
        .createHash("md5")
        .update(
          `${carData.make}-${carData.model}-${carData.year}-${carData.color}-${carData.mileage}-${carData.price}-${carData.fuelType}-${carData.transmission}-${carData.engine}-${carData.horsepower}-${carData.features}-${carData.owners}`
        )
        .digest("hex");

      carData.uniqueKey = uniqueKey;

      const existingCar = await Car.findOne({ uniqueKey });

      if (!existingCar) {
        carsToInsert.push(carData);
      }
    }

    if (carsToInsert.length > 0) {
      const cars = await Car.insertMany(carsToInsert);
      res.json(cars);
    } else {
      console.log("No hay nuevos datos para insertar en MongoDB");
      res.json({ message: "No hay nuevos datos para insertar" });
    }
  } catch (error) {
    console.error("Error al obtener o guardar los datos de la API:", error);
    res
      .status(500)
      .json({ message: "ERROR_GET_DATA_API", error: error.message });
  }
};

module.exports = getCars;
