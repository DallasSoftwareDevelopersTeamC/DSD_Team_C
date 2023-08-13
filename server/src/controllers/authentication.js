const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function generateAccessToken(user) {
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
  await prisma.token.create({
    data: {
      token: token,
      type: "ACCESS",
      userId: user.id,
    },
  });
  return token;
}

async function generateRefreshToken(user) {
  const token = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  await prisma.token.create({
    data: {
      token: token,
      type: "REFRESH",
      userId: user.id,
    },
  });
  return token;
}

async function authenticate(req, res, next) {
  try {
    const accessToken = await req.cookies.accessToken;
    if (!accessToken) {
      console.log("Error getting access token from cookies: ", req.cookies);
      return await res.status(401).json({ message: "Unauthorized" });
    }

    await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, user) => {
        if (err) {
          console.log("Error in jwt.verify:", err);
          return res.status(403).json({ message: "Forbidden" });
        }

        req.user = user;
        next();
      }
    );
  } catch (err) {
    console.log("Error in authenticate function:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// client.connect();
module.exports = {
  authenticate,
  generateAccessToken,
  generateRefreshToken,
  authenticateUser: async (req, res, next) => {
    await authenticateToken(req, res, next);
    return res.json(req.user);
  },

  loginUser: async (req, res) => {
    res.header("Access-Control-Allow-Origin", `${process.env.CORS_ORIGIN}`);
    const { username, password } = req.body;
    const user = await prisma.User.findUnique({
      where: { username: username },
      select: {
        id: true,
        username: true,
        password: true,
        settings: true,
      },
    });
    console.log("user in authentication controller - line 83", user);
    if (!user) {
      return res.json({ message: "That username doesn't exist" });
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return res.json({ message: "Incorrect password" });
    }

    // Check if the user has settings
    const userSettings = await prisma.Settings.findUnique({
      where: {
        userName: username,
      },
    });

    // Create settings for the user if they don't exist
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

    // Save refresh token in the database for the specific user
    await prisma.token.create({
      data: {
        token: refreshToken,
        type: "REFRESH",
        userId: user.id,
      },
    });

    return res
      .status(202)
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .json({ user: user });
  },

  logoutUser: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken === null) {
      return res.sendStatus(401);
    } else {
      await prisma.token.deleteMany({ where: { token: refreshToken } });
      return res
        .status(202)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json("cookies cleared");
    }
  },

  getToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken === null) return res.sendStatus(401);
    const tokenFromDB = await prisma.token.findUnique({
      where: { token: refreshToken },
    });
    if (!tokenFromDB) return res.json("RefreshTokenNotFound");
    await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) return res.json(err);
        const accessToken = await generateAccessToken(user);
        const newRefreshToken = await generateRefreshToken(user);
        await prisma.token.delete({ where: { token: refreshToken } });
        res
          .status(202)
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
      }
    );
  },
};
