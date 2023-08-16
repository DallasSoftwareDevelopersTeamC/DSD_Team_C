const redis = require('redis');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { createSettings } = require('./settings');
const createMockProducts = require("../utils/createMockProducts");
const {
  createManyInventoryItemsInternally,
} = require("../controllers/inventory");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("./authentication");

module.exports = {
  getUsers: async (req, res) => {
    let users;
    try {
      users = await prisma.User.findMany({
        include: {
          settings: true, // Return all fields
        },
      });
    } catch (error) {
      console.log("Error Found: ", error);
      return res.json(error);
    }
    return res.json(users);
  },
  getUser: async (req, res) => {
    const { id } = req.params;
    let user;
    try {
      const userData = await prisma.User.findUnique({
        where: {
          //Prisma is expecting a string value so I converted the id param from string to Number
          id: id,
        },
        include: {
          settings: true, // Return all fields
        },
      });
      user = userData;
    } catch (err) {
      console.log("Error Found: ", err);
      return res
        .status(500)
        .json({ message: "Failed to create user", error: err });
    }
    if (user) {
      return res.json(user);
    } else {
      return res.json({
        message: `There are no users with the ID ${id}`,
      });
    }
  },

  createUser: async (req, res) => {
    res.header("Access-Control-Allow-Origin", `${process.env.CORS_ORIGIN}`);
    const { username, password } = req.body;
    const hashedPassword = await argon2.hash(password);
    console.log(username, hashedPassword);
    let user;
    try {
      const createUser = await prisma.User.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });
      user = createUser;
    } catch (err) {
      console.log("Error Found: ", err);
      return res.json(err);
    }
    console.log(user.username);

    let settings;
    try {
      settings = await createSettings(user.username);
    } catch (err) {
      console.log("Error Found: ", err);
      return res.json(err);
    }
    try {
      const mockProducts = createMockProducts(user?.id);
        //   console.log(mockProducts);
        await createManyInventoryItemsInternally(mockProducts, user);
    } catch (err) {
      console.log("Error Found while creating inventory items: ", err);
      return res.json(err);
    }

    // Generate tokens for automatic login after sign up
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);

    console.log(user, settings);
    return res
      .status(202)
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .json(user);
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.User.delete({
        where: {
          id: id,
        },
      });
    } catch (err) {
      if (err.code === "P2025") {
        return res.json({ message: "User not found" });
      } else {
        console.log("Error Found: ", err);
        return res.json(err);
      }
    }
    return res.json({ message: "User deleted!" });
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const userInput = req.body;
    let user;
    try {
      const updatedUser = await prisma.User.update({
        where: {
          id: id,
        },
        data: {
          ...userInput,
        },
      });
      user = updatedUser;

      // Update user settings if provided in userInput
      if (userInput.settings) {
        await prisma.Settings.update({
          where: {
            userName: user.username,
          },
          data: {
            ...userInput.settings,
          },
        });
      }
    } catch (err) {
      if (err.code === "P2025") {
        return res.json({ message: "User not found" });
      } else {
        console.log("Error Found: ", err);
        return res.json(err);
      }
    }
    return res.json(user);
  },
};
