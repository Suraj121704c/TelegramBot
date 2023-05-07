const express = require("express");
const { userModel } = require("../modules/users.modules");

const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: All the Api routes releated to user
 */

/**
 * @swagger
 * /users/:
 *   get:
 *       summary: This will get all the users
 *       tags: [Users]
 *       responses:
 *            200:
 *                description: List of all the users also this api helps you to filter search
 *            400:
 *                description: Incorrect Request
 */

userRouter.get("/", async (req, res) => {
  const filter = {};
  if (req.query.name) {
    filter.name = { $regex: req.query.name, $options: "i" };
  }
  const users = await userModel.find(filter);
  res.send(users);
});

/**
 * @swagger
 * /users/:id:
 *   get:
 *       summary: This will get data by id
 *       tags: [Users]
 *       responses:
 *            200:
 *                description: to search by id
 *            400:
 *                description: Incorrect Request
 */

userRouter.get("/:id", async (req, res) => {
  const userId = req.params.id;
  const users = await userModel.find({ _id: userId });
  res.send(users);
});

/**
 * @swagger
 * /users/update/:id:
 *   patch:
 *       summary: This will patch an existing user
 *       tags: [Users]
 *       responses:
 *            200:
 *                description: A user has been edited
 *            400:
 *                description: Incorrect Request
 */

userRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const userId = req.params.id;
  await userModel.findByIdAndUpdate({ _id: userId }, payload);
  res.status(200).json({ msg: `User with id ${userId} has been updated` });
});

/**
 * @swagger
 * /users/delete/:id:
 *   delete:
 *       summary: This will delete an existing user
 *       tags: [Users]
 *       responses:
 *            200:
 *                description: A user has been created
 *            400:
 *                description: Incorrect Request
 */

userRouter.delete("/delete/:id", async (req, res) => {
  const userId = req.params.id;
  await userModel.findByIdAndDelete({ _id: userId });
  res.status(200).json({ msg: `User with id ${userId} has been deleted` });
});

module.exports = {
  userRouter,
};
