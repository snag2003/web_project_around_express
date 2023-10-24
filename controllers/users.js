const User = require('../models/user');
const { handleError } = require('../helpers/handleError');

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => handleError(err, res, 'usuario'));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => handleError(err, res, 'usuario'));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => handleError(err, res, 'usuario'));
};

module.exports.updateProfile = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name: req.body.name, about: req.body.about } },
    { new: true },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => handleError(err, res, 'usuario'));
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar: req.body.avatar } },
    { new: true },
  )
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => handleError(err, res, 'usuario'));
};
