const mongoose = require("mongoose");

const UserScheme = new userSchema(
  {
    name: {
      type: String,
      require: true,
    },
    last_name: {
      String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      unique: true,
    },
    role: {
      type: ["user", "admin"],
      default: "user",
      require: true,
    },
  },
  {
    timestamps: true, // registra la fecha de create y update
    versionKey: false,
  }
);

module.exports = mongoose.model("users", UserScheme); // se exporta el modelo de mongoose que contiene la tabla users"
