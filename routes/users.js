const userRouter = require("express").Router();
const fs = require("fs").promises;
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");

const getData = (usersFilePath) =>
  fs
    .readFile(usersFilePath, { encoding: "utf-8" })
    .then((data) => JSON.parse(data));

userRouter.get("/users", (req, res) =>
  getData(usersFilePath)
    .then((users) => res.send(users))
    .catch(() =>
      res.status(404).json({ message: "Requested resource not found" })
    )
);

userRouter.get("/users/:id", (req, res) => {
  getData(usersFilePath)
    .then((users) => users.find((user) => user._id === req.params.id))
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).json({ message: "User ID not found" });
      }
    });
});

module.exports = userRouter;
