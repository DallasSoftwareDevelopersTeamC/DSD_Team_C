const argon2 = require("argon2");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');


const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, CORS_ORIGIN } = require('../config/envConfig');
const { HTTP_STATUS, TOKEN_TYPES } = require('../config/constants');
const { createToken, handleError } = require('../utils/authUtils');
const { createSettings } = require('./settings'); 


const authenticate = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Unauthorized" });
    }
    jwt.verify(accessToken, ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return handleError(err, res, "Invalid Token");
      req.user = user;
      next();
    });
  } catch (err) {
    return handleError(err, res, "Internal Server Error");
  }
};

module.exports = {
  authenticate,

  generateAccessToken: (user) =>
    createToken(user, ACCESS_TOKEN_SECRET, "1h", TOKEN_TYPES.ACCESS),

  generateRefreshToken: (user) =>
    createToken(user, REFRESH_TOKEN_SECRET, "7d", TOKEN_TYPES.REFRESH),

  authenticateUser: async (req, res, next) => {
    await authenticate(req, res, next);
    res.json(req.user);
  },

  loginUser: async (req, res) => {
    res.header("Access-Control-Allow-Origin", CORS_ORIGIN);
    const { username, password } = req.body;

    const user = await prisma.User.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
        settings: true,
      },
    });

    if (!user) {
      return res.json({ message: "That username doesn't exist" });
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.json({ message: "Incorrect password" });
    }

    const userSettings = await prisma.Settings.findUnique({
      where: {
        userName: username,
      },
    });

  
    if (!userSettings) {
      try {
        await createSettings(username);
      } catch (err) {
        console.log("Error Found: ", err);
        return res.json(err);
      }
    }

    const accessToken = await module.exports.generateAccessToken(user);

    const refreshToken = await module.exports.generateRefreshToken(user);

    await prisma.token.create({
      data: {
        token: refreshToken,
        type: TOKEN_TYPES.REFRESH,
        userId: user.id,
      },
    });

    return res
      .status(HTTP_STATUS.OK)
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .json({ user });
  },

  logoutUser: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.sendStatus(HTTP_STATUS.UNAUTHORIZED);
    }

    await prisma.token.deleteMany({ where: { token: refreshToken } });

    return res
      .status(HTTP_STATUS.OK)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .json("cookies cleared");
  },

  getToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(HTTP_STATUS.UNAUTHORIZED);

    const tokenFromDB = await prisma.token.findUnique({
      where: { token: refreshToken },
    });

    if (!tokenFromDB) return res.json("RefreshTokenNotFound");

    await jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) return res.json(err);

      const accessToken = await generateAccessToken(user);
      const newRefreshToken = await generateRefreshToken(user);
      await prisma.token.delete({ where: { token: refreshToken } });

      res
        .status(HTTP_STATUS.OK)
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
        })
        .json(user);
    });
  },
};
