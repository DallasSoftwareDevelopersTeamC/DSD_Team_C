const express = require('express');
const router = express();

const companyController = require('../controllers/company');

// for now, only working on active orders, and not orderhistory
router.get('/', companyController.getCompanies);
router.get('/:id', companyController.getCompany);

router.post('/', companyController.createCompany);

// router.patch('/:id', ordersController.updateOrderItem);

router.delete('/:id', companyController.deleteCompany);

module.exports = router;
