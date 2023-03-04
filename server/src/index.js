'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
const express_1 = __importDefault(require('express'))
require('dotenv/config')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = (0, express_1.default)()

//app.use(cors())
app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
  next()
})
app.get('/', (req, res) => {
  res.json({ message: 'Server is running great' })
})
app.listen(7777, () => {
  console.log(`Team C server is running on port 5000`)
})
