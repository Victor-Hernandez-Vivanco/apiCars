// const fs = require("fs"); // spara eñiminar de forma permanente un registro
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

// insertar un registro

const createItem = async (req, res) => {
  try {
    const user = req.user;
    const { file } = req;
    if (!file) {
      handleHttpError(res, "FILE_NOT_FOUND_STORAGE", 404);
      return;
    }

    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };

    const response = await storageModel.create(fileData);
    res.send({ user, response });
  } catch (error) {
    console.error(error);
    handleHttpError(res, "ERROR_CREATE_ITEM_STORAGE");
  }
};

// obtine la lista de los registros
const getItems = async (req, res) => {
  try {
    const user = req.user;
    const data = await storageModel.find({});
    res.send({ user, data });
  } catch (error) {
    handleHttpError(res, "ERROR_LIST_ITEMS_ STORAGE");
  }
};

// obtener un registro por su id
const getItem = async (req, res) => {
  try {
    const user = req.user;
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    res.send({ user, data });
  } catch (error) {
    handleHttpError(res, "ERROR_DETAIL_ITEM_STORAGE");
  }
};

// eliminar un registro por su id
const deleteItem = async (req, res) => {
  try {
    const user = req.user;
    const { id } = matchedData(req);
    const datafile = await storageModel.findById(id);
    await storageModel.delete({ _id: id });
    if (!datafile) {
      return res.status(404).send({ message: "Storage not found" });
    }
    // await storageModel.deleteOne(id) es para eliminar de forma permanente un registro
    const { filename } = datafile;
    const filePath = `${MEDIA_PATH}/${filename}`;

    // fs.unlinkSync(filePath); // espara eliminar de forma permanente un registro
    const data = {
      filePath,
      deleted: 1,
    };
    res.send({ user, data });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM_STORAGE");
  }
};

// eliminar todos los registros
const deleteAllItems = async (req, res) => {
  try {
    const user = req.user;
    const result = await storageModel.deleteMany({});
    res.send({ user, result });
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ALL_ITEMS_STORAGE");
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  deleteItem,
  deleteAllItems,
};
