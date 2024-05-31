const express = require("express");
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

const a = fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);
  if (name !== "index") {
    console.log(`CARGANDO RUTA ${name}`);
    router.use(`/${name}`, require(`./${file}`)); // todo http://localstorage:3000/api/(cars)
  }
});

module.exports = router;
