const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @param {Object} user //se pasa el objeto del usuario
 */
const tokenSign = (user) => {
  const sign = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return sign;
};

const verifyToken = async (tokenjwt) => {
  try {
    return jwt.verify(tokenjwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
