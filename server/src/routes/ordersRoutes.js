const express = require('express')
const router = express.Router()

const ordersController = require('../controllers/orders')

// for now, only working on active orders, and not orderhistory
router.get('/', ordersController.getAllActiveOrders)
router.post('/', ordersController.createOrder)



module.exports = router