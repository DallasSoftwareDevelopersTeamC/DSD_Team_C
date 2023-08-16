const express = require('express');
const router = express();

const usersController = require('../controllers/user');
// for now, only working on active orders, and not orderhistory
router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);

router.post("/", usersController.createUser);
router.patch("/:id", usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
