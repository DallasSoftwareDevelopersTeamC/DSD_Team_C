import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { HTTP_STATUS } from '../config/constants.js';

const prisma = new PrismaClient();

async function createToken(data, secret, expiry, type) {
  const token = jwt.sign(data, secret, { expiresIn: expiry });
  await prisma.token.create({
    data: {
      token: token,
      type: type,
      userId: data.id,
    },
  });
  return token;
}

function handleError(err, res, defaultMsg) {
  console.error("Error:", err.message);
  const message =
    err.name === "TokenExpiredError" ? "Token Expired" : defaultMsg;
  res.status(HTTP_STATUS.FORBIDDEN).json({ message });
}

export { createToken, handleError };
