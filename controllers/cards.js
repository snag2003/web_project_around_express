const Card = require("../models/card");
const handleError = require("../helpers/handleError");

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => handleError(err, res, "tarjeta"));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => handleError(err, res, "tarjeta"));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params._id)
    .orFail()
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => handleError(err, res, "tarjeta"));
};
