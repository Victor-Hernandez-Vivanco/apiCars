const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateCar = [
  check("id").exists().notEmpty(),
  check("make").exists().notEmpty(),
  check("model").exists().notEmpty(),
  check("year").exists().notEmpty(),
  check("color").exists().notEmpty(),
  check("mileage").exists().notEmpty(),
  check("price").exists().notEmpty(),
  check("fuelType").exists().notEmpty(),
  check("transmission").exists().notEmpty(),
  check("engine").exists().notEmpty(),
  check("horsepower").exists().notEmpty(),
  check("features").exists().notEmpty(),
  check("owners").exists().notEmpty(),
  check("uniqueKey").exists().notEmpty(),
  check("mediaId").exists().notEmpty(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateCar };
