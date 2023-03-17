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
client.connect();
module.exports = {
  getUsers: async (req, res) => {
    let users;
    try {
      users = await prisma.User.findMany({
        include: {
          company: true, // Return all fields
        },
      });
    } catch (error) {
      console.log('Error Found: ', error);
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
          company: true, // Return all fields
        },
      });
      user = userData;
    } catch (err) {
      console.log('Error Found: ', err);
      return res.json(err);
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
      if (err.code === 'P2003') {
        return res.json({ message: 'Company ID not found' });
      } else {
        console.log('Error Found: ', err);
        return res.json(err);
      }
    }
    return res.json(user);
  },
  loginUser: async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
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
    await client.rPush('refreshTokens', refreshToken);
    return res
      .status(202)
      .cookie('accessToken', accessToken)
      .cookie('refreshToken', refreshToken)
      .json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
      });
    // return res.json(user);
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
      if (err.code === 'P2025') {
        return res.json({ message: 'User not found' });
      } else {
        console.log('Error Found: ', err);
        return res.json(err);
      }
    }
    return res.json({ message: 'User deleted!' });
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    const userInput = req.body;
    let user;
    try {
      updatedUser = await prisma.User.update({
        where: {
          id: id,
        },
        data: {
          ...userInput,
        },
      });
      user = updatedUser;
    } catch (err) {
      if (err.code === 'P2025') {
        return res.json({ message: 'User not found' });
      } else {
        console.log('Error Found: ', err);
        return res.json(err);
      }
    }
    return res.json(user);
  },
};
