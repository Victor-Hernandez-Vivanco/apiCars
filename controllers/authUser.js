const { matchedData } = require("express-validator");
const { usersModel } = require("../models");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleError");

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });
    const data = {
      message: "USER_REGISTERED",
      token: tokenSign(dataUser),
      user: dataUser,
    };
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_REGISTER_USER", error);
  }
};

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ email: req.email })
      .select("password username email role");

    if (!user) {
      handleHttpError(res, "USER_NOT_EXIST", 404);
      return;
    }
    const hashPassword = user.get("password");
    const check = await compare(req.password, hashPassword);

    if (!check) {
      handleHttpError(res, "PASSWORD_NOT_MATCH", 401);
      return;
    }
    user.set("password", undefined, { strict: false });
    const data = {
      message: "USER_LOGGED_IN",
      token: await tokenSign(user),
      user: user,
    };
    res.send({ data });
  } catch (error) {
    console.log(error);
    handleHttpError(res, "ERROR_LOGIN_USER", error);
  }
};

module.exports = { registerCtrl, loginCtrl };
