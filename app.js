const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const userRouter = require("./routes/users.js");
const cardRouter = require("./routes/cards.js");

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/", userRouter);
app.use("/", cardRouter);
app.get("*", (req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
