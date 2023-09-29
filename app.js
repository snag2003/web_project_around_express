const express = require("express");
const path = require("path");

const userRouter = require("./routes/users"); // Assuming the route file is named users.js
const cardRouter = require("./routes/cards"); // Assuming the route file is named cards.js

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/users", userRouter);
app.use("/cards", cardRouter);

// Middleware para manejar errores 404
app.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

// Middleware para manejar errores 500
app.use((err, req, res) => {
  console.error(err);
  res.status(500).json({ message: "An error has occurred on the server" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
