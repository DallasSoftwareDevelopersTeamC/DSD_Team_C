const express = require('express')
const router = express.Router()
// const authController = require('../controllers/') 
const inventoryController = require('../controllers/inventory')

router.get('/', inventoryController.getAllInventoryItems)
router.get('/:itemID', inventoryController.getSingleItem)


module.exports = router