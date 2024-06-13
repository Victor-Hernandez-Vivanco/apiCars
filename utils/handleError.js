// const handleHttpError = (res, message = "Algo sucedio", code = 403) => {
//   res.status(code);
//   res.send({ error: message });
// };

// module.exports = { handleHttpError };

const handleHttpError = (res, message = "Algo sucedió", code = 403) => {
  if (!res.headersSent) {
    res.status(code).send({ error: message });
  }
};

module.exports = { handleHttpError };
