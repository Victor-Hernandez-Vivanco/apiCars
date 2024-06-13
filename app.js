require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnectMongo = require("./config/mongo");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("storage"));
app.use("/api", require("./routes"));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Servicio iniciado en http://localhost:${port}`);
});

dbConnectMongo();
