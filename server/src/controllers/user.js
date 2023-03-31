const redis = require('redis');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { createSettings } = require('./settings');

const client = redis.createClient({
  password: process.env.REDIS,
  socket: {
    host: 'redis-12591.c279.us-central1-1.gce.cloud.redislabs.com',
    port: 12591,
  },
});

function generateAccessToken(user) {
  const userPayload = {
    id: user.id,
    username: user.username,
    companyID: user.companyID,
  };
  //  A typical expiration time for access tokens is 15 minutes to 1 hour, depending on the sensitivity of the data being accessed and the security requirements of your application.
  return jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
}

function generateRefreshToken(user) {
  const userPayload = {
    id: user.id,
    username: user.username,
    companyID: user.companyID,
  };
  return jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET, {
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
          company: true,
          settings: true, // Return all fields
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
          company: true,
          settings: true, // Return all fields
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
    res.header('Access-Control-Allow-Origin', `${process.env.CORS_ORIGIN}`);
    const { username, password, companyID } = req.body;
    const hashedPassword = await argon2.hash(password);
    console.log(username, hashedPassword, companyID);
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
    console.log(user.username);
    let settings;
    try {
      settings = await createSettings(user.username);
    } catch (err) {
      console.log('Error Found: ', err);
      return res.json(err);
    }

    console.log(user, settings);
    return res.json(user);
  },

  loginUser: async (req, res) => {
    res.header('Access-Control-Allow-Origin', `${process.env.CORS_ORIGIN}`);
    const { username, password } = req.body;
    const user = await prisma.User.findUnique({
      where: { username: username },
      select: {
        id: true,
        username: true,
        password: true,
        companyID: true,
      },
    });
    if (!user) {
      return res.json({ message: "That username doesn't exist" });
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.json({ message: 'Incorrect password' });
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
  logoutUser: async (req, res) => {
    const refreshToken = await req.cookies.refreshToken;
    /*If the refresh token is not found then the server will respond with error message "RefreshTokenNotFound"*/
    if (refreshToken === null) {
      return await res.sendStatus(401);
    } else {
      await client.lRem('refreshTokens', 0, req.cookies.refreshToken);
      return res
        .status(202)
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .json('cookies cleared');
    }
  },
};
