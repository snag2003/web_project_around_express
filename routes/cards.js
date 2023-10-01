const cardRouter = require("express").Router();
const fs = require("fs").promises;
const path = require("path");

cardRouter.get("/cards", (req, res) => {
  const cardsFilePath = path.join(__dirname, "../data/cards.json");
  fs.readFile(cardsFilePath, { encoding: "utf-8" })
    .then((data) => JSON.parse(data))
    .then((cards) => res.send(cards))
    .catch(() =>
      res.status(404).json({ message: "Requested resource not found" })
    );
});

module.exports = cardRouter;
