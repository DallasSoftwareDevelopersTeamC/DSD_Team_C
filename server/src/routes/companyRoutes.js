const express = require('express');
const router = express();

const companysController = require('../controllers/company');

// for now, only working on active orders, and not orderhistory
// router.get('/', ordersController.getAllActiveOrders);
// router.get('/:id', ordersController.getOrderItem);

router.post('/', companysController.createCompany);

// router.patch('/:id', ordersController.updateOrderItem);

// router.delete('/:id', ordersController.deleteOrderItem);

module.exports = router;
