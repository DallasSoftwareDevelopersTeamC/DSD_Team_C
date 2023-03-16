const redis = require('redis');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const client = redis.createClient({
  password: process.env.REDIS,
  socket: {
    host: 'redis-12591.c279.us-central1-1.gce.cloud.redislabs.com',
    port: 12591,
  },
});
module.exports = {
  createUser: async (req, res) => {
    const { username, password, companyID } = req.body;
    const hashedPassword = await argon2.hash(password);
    let user;
    try {
      const createUser = await prisma.User.create({
        data: {
          username: username,
          password: hashedPassword,
          companyID: companyID,
        },
      });
      user = createUser;
    } catch (err) {
      console.log('Error Found: ', err);
      return res.json(err);
    }
    return res.json(user);
  },
  loginUser: async (req, res) => {
    await client.connect();
    const { username, password } = req.body;
    const user = await prisma.User.findUnique({
      where: { username: username },
    });
    if (!user) {
      return res.json({ message: "that username doesn't exist" });
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.json({ message: 'incorrect password' });
    }
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    await client.lPush('refreshTokens', refreshToken);
    function generateAccessToken(user) {
      return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '5s',
      });
    }
    function generateRefreshToken(user) {
      return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '4h',
      });
    }
    res
      .status(202)
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .json({ accessToken: accessToken, refreshToken: refreshToken });

    return res.json(user);
  },
};
