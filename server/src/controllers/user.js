const redis = require('redis');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { createSettings } = require('./settings');
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
      //   console.log(mockProducts);
      await createManyInventoryItemsInternally(mockProducts);
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

const mockProducts = [
  {
    sku: "001",
    brand: "Dell",
    productName: "Inspiron 5000",
    description: "15.6-inch laptop with Intel Core i5",
    inStock: 100,
    shipper: "FastShip",
    reorderAt: 70,
    orderQty: 30,
    unitPrice: 600,
  },
  {
    sku: "002",
    brand: "HP",
    productName: "Pavilion",
    description: "14-inch laptop with Intel Core i7",
    inStock: 80,
    shipper: "SpeedyDelivery",
    reorderAt: 56,
    orderQty: 20,
    unitPrice: 750,
  },
  {
    sku: "003",
    brand: "Lenovo",
    productName: "ThinkPad",
    description: "13-inch business laptop",
    inStock: 150,
    shipper: "Express",
    reorderAt: 102,
    orderQty: 25,
    unitPrice: 700,
  },

  {
    sku: "016",
    brand: "Apple",
    productName: "iPhone 13",
    description: "Latest Apple iPhone with Face ID",
    inStock: 200,
    shipper: "AirDelivery",
    reorderAt: 160,
    orderQty: 10,
    unitPrice: 999,
  },
  {
    sku: "017",
    brand: "Samsung",
    productName: "Galaxy S21",
    description: "Samsung flagship smartphone",
    inStock: 50,
    shipper: "Gamer's Ship",
    reorderAt: 35,
    orderQty: 15,
    unitPrice: 850,
  },
  {
    sku: "018",
    brand: "Google",
    productName: "Pixel 6",
    description: "Google's latest smartphone",
    inStock: 75,
    shipper: "TechExpress",
    reorderAt: 40,
    orderQty: 20,
    unitPrice: 799,
  },
];