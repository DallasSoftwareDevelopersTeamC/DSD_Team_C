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
require('dotenv').config({ path: './config/.env' });
const cors = require('cors');

const inventoryRoutes = require('./routes/inventoryRoutes');
const ordersRoutes = require('./routes/ordersRoutes');

// allow all origins during development?
app.use(
  cors({
    origin: '*',
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

app.use('/', inventoryRoutes);
app.use('/orders', ordersRoutes);

app.listen(80, () => {
  console.log('server is running!');
});
