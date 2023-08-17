const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { HTTP_STATUS } = require('../config/constants');

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

module.exports = { createToken, handleError };
