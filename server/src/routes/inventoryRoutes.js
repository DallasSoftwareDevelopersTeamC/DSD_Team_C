const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'text/csv') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .csv format allowed!'));
    }
  },
});
// const authController = require('../controllers/')
const inventoryController = require('../controllers/inventory');
const express = require('express');
const inventory = require('../controllers/inventory');
const router = express.Router();
// const authController = require('../controllers/')
const inventoryController = require('../controllers/inventory');

router.get('/', inventoryController.getInventoryList);
router.get('/:id', inventoryController.getInventoryItem);

router.post('/', inventoryController.createInventoryItem);
router.post(
  '/upload',
  upload.single('myFile'),
  inventoryController.convertCsvFileToJson
);

// we can use PATCH to replce some values or use PUT to replace whole item
router.patch('/:id', inventoryController.updateInventoryItem);

router.delete('/:id', inventoryController.deleteInventoryItem);

module.exports = router;
