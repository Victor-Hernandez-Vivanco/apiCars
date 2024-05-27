//const express = require("express");
const { carsModel } = require("../models");
const { handleHttpError } = require("./utils/handleError");

const getCars = async (req, res) => {
  try {
    const data = await carsModel.find(data);
    console.log("Vehículos de MOngo -->", data);
    res.send({ data });
  } catch (error) {
    handleHttpError(res, "ERROR_GET_CARS", error);
  }
};

module.exports = { getCars };
