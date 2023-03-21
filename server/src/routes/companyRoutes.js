const express = require('express');
const router = express();

const companyController = require('../controllers/company');

// for now, only working on active orders, and not orderhistory
router.get('/', companyController.getCompanies);
// router.get('/:id', ordersController.getOrderItem);

router.post('/', companyController.createCompany);

// router.patch('/:id', ordersController.updateOrderItem);

// router.delete('/:id', ordersController.deleteOrderItem);

module.exports = router;
