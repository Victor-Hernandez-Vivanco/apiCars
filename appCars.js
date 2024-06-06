require("dotenv").config();
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const Car = require("./models/cars");
const dbConnectMongo = require("./config/mongo");

const app = express();
const apiPort = process.env.API_PORT || 3001;

app.use(express.json());

app.get("/fetch-cars", async (req, res) => {
  try {
    const response = await axios.get(process.env.API_URL);
    const data = response.data;
    console.log("Esta es la data de la api -->", data);

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
      console.log("Nuevos datos guardados en MongoDB:", cars);
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
});

app.listen(apiPort, () => {
  console.log(
    `Servicio de obtención de datos iniciado en http://localhost:${apiPort}`
  );
});

dbConnectMongo();
