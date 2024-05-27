const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");
const router = express.Router(); //  es el manejador de las rutas

router.get("/:id", getUser);

router.get("/", getUsers);

router.put("/:id", updateUser);

router.post("/", createUser);

router.delete("/:id", deleteUser);

module.exports = router(getUsers, getUser, createUser, updateUser, deleteUser);
