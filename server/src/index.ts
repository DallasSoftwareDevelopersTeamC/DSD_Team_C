import express, { Request, Response } from 'express';
import 'dotenv/config';
import Redis from 'ioredis';
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: "Congrats! You have accessed Team C's server" });
});

app.listen(4000, () => {
  console.log(`Team C server is running on port 4000`);
});
