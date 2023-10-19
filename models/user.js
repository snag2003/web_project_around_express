const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^(https?:)(www\.)?[A-Za-z0-9._~:\/?%#[\]@!$&'()*+,;=-]+#?/.test(
          v
        );
      },
      message: "Lo sentimos. Tienes que poner una direccíon valida",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
