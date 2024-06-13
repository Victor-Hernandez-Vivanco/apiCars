// const { handleHttpError } = require("../utils/handleError");

// const checkRole = (roles) => (req, res, next) => {
//   try {
//     const { user } = req;
//     const rolesByUser = user.role;
//     const checkValueRol = roles.some((rolSingle) =>
//       rolesByUser.includes(rolSingle)
//     );
//     if (!checkValueRol) {
//       handleHttpError(res, "USER_ERROR_PERMISSIONS", 403);
//     }
//   } catch (error) {
//     handleHttpError(res, "ERROR_PERMISSIONS", 403);
//   }
//   next();
// };
// module.exports = checkRole;

const { handleHttpError } = require("../utils/handleError");

const checkRole = (roles) => (req, res, next) => {
  try {
    const { user } = req;
    const rolesByUser = user.role;

    const checkValueRol = roles.some((rolSingle) =>
      rolesByUser.includes(rolSingle)
    );

    if (!checkValueRol) {
      return handleHttpError(res, "USER_ERROR_PERMISSIONS", 403);
    }

    next();
  } catch (error) {
    return handleHttpError(res, "ERROR_PERMISSIONS", 403);
  }
};

module.exports = checkRole;
