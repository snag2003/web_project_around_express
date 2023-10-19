function handleError(err, res, model) {
  if (err.name === "ValidationError") {
    return res.status(400).send({
      message: `Solicitud incorrecta: Se han pasado datos invalidos`,
    });
  }
  if (err.name === "CastError") {
    return res.status(404).send({ message: `${model} no encontrado` });
  }
  return res.status(500).send({ message: "Error Interno del Servidor" });
}

module.exports = handleError;
