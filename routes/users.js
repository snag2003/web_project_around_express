const userRouter = require("express").Router();
const fs = require("fs");
const path = require("path");

userRouter.get("/users", (req, res) => {
  const usersFilePath = path.join(__dirname, "../data/users.json");
  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while reading data" });
      return;
    }
    const users = JSON.parse(data);
    res.send(users);
  });
});

userRouter.get("/:id", (req, res) => {
  const userId = req.params.id;
  const usersFilePath = path.join(__dirname, "../data/users.json");
  fs.readFile(usersFilePath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "An error occurred while reading data" });
      return;
    }
    const users = JSON.parse(data);

    const user = users.find((u) => u.id === userId);

    if (!user) {
      res.status(404).json({ message: "User ID not found" });
      return;
    }

    res.send(user);
  });
});

module.exports = userRouter;
