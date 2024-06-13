const express = require("express");
const router = express.Router();
const { loginCtrl, registerCtrl } = require("../controllers/authUser");
const {
  validatorRegisterUser,
  validatorLoginUser,
} = require("../validators/authUser");

router.post("/register", validatorRegisterUser, registerCtrl);

router.post("/login", validatorLoginUser, loginCtrl);

module.exports = router;
