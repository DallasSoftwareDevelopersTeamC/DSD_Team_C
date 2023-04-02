const express = require('express');
const inventory = require('../controllers/inventory');
const router = express.Router();
const inventoryController = require('../controllers/inventory');

// Need to get this to work to give controllers access to req.user, to filter the database data by companyId
// Problem: adding the authenticateToken as middleware causes problems because it can't access the accessToken from cookies for some reason
// -- console.log message generated from authenticateToken function: Error getting access token from cookies:  [Object: null prototype] {}

/* const { authenticateToken } = require('../controllers/authentication');

function logReqUser(req, res, next) {
    console.log('req.user:', req.user);
    next();
}
// the logReqUser function is never reached because the problem in authenticateToken function causes the function to return sendStatus(401)
router.get('/', authenticateToken, logReqUser, inventoryController.getInventoryList); */

router.get('/:userData', inventoryController.getInventoryList);
// router.get('/:id', inventoryController.getInventoryItem);

router.post('/', inventoryController.createInventoryItem);
router.post('/upload', inventoryController.convertCsvFileToJson);
router.post('/bulk', inventoryController.createManyInventoryItems);

// we can use PATCH to replce some values or use PUT to replace whole item
router.patch('/:id', inventoryController.updateInventoryItem);

router.delete('/bulk', inventoryController.deleteInventoryItems);

module.exports = router;
