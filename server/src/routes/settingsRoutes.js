// const authController = require('../controllers/')
const express = require('express');
const settings = require('../controllers/settings');
const router = express();
// const authController = require('../controllers/')
const settingsController = require('../controllers/settings');

router.get('/:id', settingsController.getSettings);

// we can use PATCH to replce some values or use PUT to replace whole item
router.patch('/:id', settingsController.updateSetting);

module.exports = router;
