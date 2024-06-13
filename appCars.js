require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnectMongo = require("./config/mongo");

const appCar = express();

appCar.use(cors());
appCar.use(express.json());
appCar.use("/api", require("./routes"));

const apiPort = process.env.API_CARS;

appCar.listen(apiPort, () => {
  console.log(
    `Servicio de obtención de datos iniciado en http://localhost:${apiPort}`
  );
});

dbConnectMongo();
