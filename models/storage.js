// const { sequelize } = require("../../config/mysql");
// const { DataTypes } = require("sequelize");

// const Storage = sequelize.define(
//   "storages",
//   {
//     url: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     filename: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     timestamps: false,
//   }
// );

// module.exports = Storage;

const mongoose = require("mongoose");
const SoftDeleteModel = require("mongoose-delete");

const StorageSchema = new mongoose.Schema(
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
StorageSchema.plugin(SoftDeleteModel, { overrideMethods: "all" });
module.exports = mongoose.model("storages", StorageSchema); // se exporta el modelo de mongoose que contiene la tabla storage
