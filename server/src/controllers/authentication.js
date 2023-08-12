const redis = require('redis');
const jwt = require('jsonwebtoken');

/* const client = redis.createClient({
  password: process.env.REDIS,
  socket: {
    host: 'redis-12591.c279.us-central1-1.gce.cloud.redislabs.com',
    port: 12591,
  },
}); */

async function authenticateToken(req, res, next) {
  const accessToken = await req.cookies.accessToken;

  // console.log('accessToken:', accessToken);


  if (!accessToken) {
    console.log('Error getting access token from cookies: ', req.cookies);
    return await res.sendStatus(401);
  }

  await jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    async (err, user) => {
      if (err) {
        console.log('Error in jwt.verify:', err); // Log the error in jwt.verify
        return res.json(err.name);
      }

      req.user = user;
      next();
    }
  );
}

// client.connect();
module.exports = {
  authenticateToken,
  authenticateUser: async (req, res, next) => {
    await authenticateToken(req, res, next);
    return res.json(req.user);
  },
  getToken: async (req, res) => {
    /*Retrieves the refresh token from the front-end which is stored in a cookie. */
    const refreshToken = await req.cookies.refreshToken;
    /*If the refresh token is not found then the server will respond with error message "RefreshTokenNotFound"*/
    if (refreshToken === null) return await res.sendStatus(401);
    /*refreshTokens retrieves all items from redis with the "refreshTokens" key. 0 indicates the first element on the list and -1 is the last element on the list*/
    const refreshTokens = await client.lRange('refreshTokens', 0, -1);
    /*If the refresh token is not found then the server will respond will respond with error message "RefreshTokenNotFound" */
    if (!refreshTokens.includes(refreshToken))
      return res.json('RefreshTokenNotFound');
    /*If the refresh token is found then JWT authenticates the token by comparing it to the 
    REFRESH_TOKEN_SECRET environment variable */
    await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, user) => {
        if (err) return res.json(err);
        /*If the refresh token is authenticated then a new access token and refresh token will be created */
        const accessToken = await jwt.sign(
          user,
          process.env.ACCESS_TOKEN_SECRET
        );
        const newRefreshToken = await jwt.sign(
          user,
          process.env.REFRESH_TOKEN_SECRET
        );
        /*The new refresh token is pushed to redis and the server sends a new refresh and access token
      to the front-end through a cookie. The server also sends the user data. */
        await client.rPush('refreshTokens', newRefreshToken);
        res
          .status(202)
          .cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
          })
          .cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
          })
          .json(user);
      }
    );
    /*Redis removes the old refresh token after adding the new one. */
    await client.lRem('refreshTokens', 0, refreshToken);
  },
};
