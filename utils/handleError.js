/**
 * Metodo de Errores para uso dinamico
 * @param {*} res
 * @param {*} message
 * @param {*} code
 */
const handleHttpError = (res, message = "Algo sucedio", code = 403) => {
  res.status(code);
  res.send({ error: message });
};

module.exports = { handleHttpError };
