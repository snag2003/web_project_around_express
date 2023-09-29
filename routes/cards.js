const cardRouter = require("express").Router();
const cards = require("../data/cards.json");

cardRouter.get("/cards", (req, res) => {
  const cardsFilePath = path.join(__dirname, "../data/cards.json");
  fs.readFile(cardsFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while reading data" });
      return;
    }
    const cards = JSON.parse(data);
    res.send(cards);
  });
});

module.exports = cardRouter;
