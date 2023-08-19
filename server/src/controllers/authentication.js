import argon2 from "argon2";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../config/envConfig.js";
import { HTTP_STATUS, TOKEN_TYPES } from "../config/constants.js";
import { createToken } from "../utils/authUtils.js";
import { createSettings } from "./settings.js";
import { authenticateJWT } from "../middleware/jwtAuth.js";
import prisma from "../config/prismaClient.js";

export const generateAccessToken = (user) =>
  createToken(user, ACCESS_TOKEN_SECRET, "1h", TOKEN_TYPES.ACCESS);

export const generateRefreshToken = (user) =>
  createToken(user, REFRESH_TOKEN_SECRET, "7d", TOKEN_TYPES.REFRESH);

export const authenticateUser = async (req, res, next) => {
  await authenticateJWT(req, res, next);
  res.json(req.user);
};

export const loginUser = async (req, res) => {
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

  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);

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
};

export const logoutUser = async (req, res) => {
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
};

export const getToken = async (req, res) => {
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
};
