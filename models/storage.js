const mongoose = require("mongoose");

const StorageScheme = new mongoose.Schema(
  {
    url: {
      type: String,
    },
    filename: {
      type: String,
    },
  },
  {
    timestamps: true, // registra el createAt y updateaAt
    versionKey: false,
  }
);
module.exports = mongoose.model("storages", StorageScheme); // se exporta el modelo de mongoose que contiene la tabla storage
