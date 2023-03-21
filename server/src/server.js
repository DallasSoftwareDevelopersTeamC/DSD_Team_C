'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });

// was having problems using this express syntax with the (app.use(express.json())) below
// const express_1 = __importDefault(require('express'))
// const app = (0, express_1.default)()
const express = require('express');
const app = express();
require('dotenv').config({ path: '../.env' });
const cors = require('cors');
const cookieParser = require('cookie-parser');

const inventoryRoutes = require('./routes/inventoryRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const authenticationRoutes = require('./routes/authenticationRoutes');
// allow all origins during development?
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// allowing express to read incoming json data
app.use(express.json());
// allowing express to read urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});
app.use(cookieParser());
app.use('/inventory', inventoryRoutes);
app.use('/orders', ordersRoutes);
app.use('/user', userRoutes);
app.use('/company', companyRoutes);
app.use('/authentication', authenticationRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(7777, () => {
  console.log('server is running!');
});
