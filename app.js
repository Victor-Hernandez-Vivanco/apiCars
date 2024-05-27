require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnectMongo = require("./config/mongo");
const axios = require("axios");
const Car = require("./models/cars");
const crypto = require("crypto");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

app.get("/api/cars", async (req, res) => {
  try {
    const response = await axios.get(process.env.API_URL);
    const data = response.data;
    console.log("Esta es la data de la api -->", data);

    const carsToInsert = [];

    for (const carData of data) {
      // Crear una clave única basada en los atributos del vehículo
      const uniqueKey = crypto
        .createHash("md5")
        .update(
          `${carData.make}-${carData.model}-${carData.year}-${carData.color}-${carData.mileage}-${carData.price}-${carData.fuelType}-${carData.transmission}-${carData.engine}-${carData.horsepower}-${carData.features}-${carData.owners}`
        )
        .digest("hex");

      carData.uniqueKey = uniqueKey;

      // Verificar si el coche ya existe en la base de datos
      const existingCar = await Car.findOne({ uniqueKey });

      if (!existingCar) {
        carsToInsert.push(carData);
      }
    }

    if (carsToInsert.length > 0) {
      // Guardar los datos no duplicados en MongoDB
      const cars = await Car.insertMany(carsToInsert);
      console.log("Datos guardados en MongoDB:", cars);
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

const port = process.env.PORT || 3000;

//app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Servicio iniciado en http://localhost:${port}`);
});

dbConnectMongo();
