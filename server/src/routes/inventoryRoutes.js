const express = require('express');
const inventory = require('../controllers/inventory');
const router = express.Router();
const inventoryController = require('../controllers/inventory');

// leaving this here for now - need to get this to work to give controllers access to req.user
/* const { authenticateToken } = require('../controllers/authentication');

function logReqUser(req, res, next) {
    console.log('req.user:', req.user);
    next();
}

router.get('/', authenticateToken, logReqUser, inventoryController.getInventoryList); */

router.get('/', inventoryController.getInventoryList);
router.get('/:id', inventoryController.getInventoryItem);

router.post('/', inventoryController.createInventoryItem);
router.post('/upload', inventoryController.convertCsvFileToJson);
router.post('/bulk', inventoryController.createManyInventoryItems);

// we can use PATCH to replce some values or use PUT to replace whole item
router.patch('/:id', inventoryController.updateInventoryItem);

router.delete('/bulk', inventoryController.deleteInventoryItems);

module.exports = router;
