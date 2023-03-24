const express = require('express');
const router = express();

const authenticationController = require('../controllers/authentication');
// for now, only working on active orders, and not orderhistory
router.get('/token', authenticationController.getToken);
router.get('/authenticateUser', authenticationController.authenticateUser);

module.exports = router;
