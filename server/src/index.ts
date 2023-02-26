import express, { Request, Response } from 'express';
import 'dotenv/config';
import Redis from 'ioredis';
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Server is running' });
});

app.listen(4000, () => {
  console.log(`Team C server is running on port 4000`);
});
