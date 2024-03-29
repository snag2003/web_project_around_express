const Card = require('../models/cards');
const { handleError } = require('../helpers/handleError');

module.exports.getCards = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => handleError(err, res, 'tarjeta'));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => handleError(err, res, 'tarjeta'));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => handleError(err, res, 'tarjeta'));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({ card }))
    .catch((err) => handleError(err, res, 'tarjeta'));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.status(200).send({ card }))
    .catch((err) => handleError(err, res, 'tarjeta'));
};
