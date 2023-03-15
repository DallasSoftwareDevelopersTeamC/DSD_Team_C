const express = require('express');
const router = express();

const usersController = require('../controllers/user');

// for now, only working on active orders, and not orderhistory
// router.get('/', ordersController.getAllActiveOrders);
// router.get('/:id', ordersController.getOrderItem);

router.post('/', usersController.createUser);
router.post('/login', usersController.loginUser);

// router.patch('/:id', ordersController.updateOrderItem);

// router.delete('/:id', ordersController.deleteOrderItem);

module.exports = router;
