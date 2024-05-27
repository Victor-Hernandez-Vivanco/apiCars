const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    engine: {
      type: String,
      required: true,
    },
    horsepower: {
      type: Number,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
    owners: {
      type: Number,
      required: true,
    },
    uniqueKey: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true, // registra la fecha de creación y actualización
    versionKey: false,
  }
);

module.exports = mongoose.model("cars", carsSchema);
