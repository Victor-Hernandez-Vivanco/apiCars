const mongoose = require("mongoose");

const dbConnectMongo = async () => {
  try {
    const DB_MONGO = process.env.DB_MONGO;
    await mongoose.connect(DB_MONGO);
    console.log("MONGO_CONEXION_TRUE");
  } catch (error) {
    console.log("MONGO_CONEXION_FALSE ", error);
  }
};

module.exports = dbConnectMongo;
