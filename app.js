require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnectMongo = require("./config/mongo");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

const apiPort = process.env.API_PORT || 3001;
const port = process.env.PORT || 3000;

app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Servicio iniciado en http://localhost:${port}`);
});

app.listen(apiPort, () => {
  console.log(
    `Servicio de obtención de datos iniciado en http://localhost:${apiPort}`
  );
});

dbConnectMongo();
