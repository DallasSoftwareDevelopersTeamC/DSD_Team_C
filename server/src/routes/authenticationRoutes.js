const express = require('express');
const router = express();

const authenticationController = require('../controllers/authentication');
// for now, only working on active orders, and not orderhistory
router.get('/token', authenticationController.getToken);
router.get('/authenticateUser', authenticationController.authenticateUser);

// router.post('/', usersController.createUser);
// router.post('/login', usersController.loginUser);

// router.patch('/:id', usersController.updateUser);

// router.delete('/:id', usersController.deleteUser);

module.exports = router;
