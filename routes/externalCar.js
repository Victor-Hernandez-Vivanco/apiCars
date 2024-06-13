const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/session");
const checkRole = require("../middleware/rol");

const getCars = require("../controllers/externalCarController");

router.get("/", authMiddleware, checkRole(["admin"]), getCars);

module.exports = router;
