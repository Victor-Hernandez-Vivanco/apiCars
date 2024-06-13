const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorRegisterUser = [
  check("username").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("password").exists().notEmpty().isLength({ min: 6, max: 50 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorLoginUser = [
  check("password").exists().notEmpty().isLength({ min: 6, max: 50 }),
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorRegisterUser, validatorLoginUser };
