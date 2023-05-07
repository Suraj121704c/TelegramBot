const express = require("express");
const { userModel } = require("../modules/users.modules");

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const filter = {};
  if (req.query.name) {
    filter.name = { $regex: req.query.name, $options: "i" };
  }
  const users = await userModel.find(filter);
  res.send(users);
});

userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const users = await userModel.find({ _id: userId });
  res.send(users);
});

userRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const userId = req.params.id;
  await userModel.findByIdAndUpdate({ _id: userId }, payload);
  res.status(200).json({ msg: `User with id ${userId} has been updated` });
});

userRouter.delete("/delete/:id", async (req, res) => {
  const userId = req.params.id;
  await userModel.findByIdAndDelete({ _id: userId });
  res.status(200).json({ msg: `User with id ${userId} has been deleted` });
});

module.exports = {
  userRouter,
};
