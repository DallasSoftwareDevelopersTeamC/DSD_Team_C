// const authController = require('../controllers/')
const express = require('express');
const inventory = require('../controllers/inventory');
const router = express();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads');
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype == 'text/csv') {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(new Error('Only .csv format allowed!'));
//     }
//   },
// });
// const authController = require('../controllers/')
const inventoryController = require('../controllers/inventory');

router.get('/', inventoryController.getInventoryList);
router.get('/:id', inventoryController.getInventoryItem);

router.post('/', inventoryController.createInventoryItem);
router.post('/upload', inventoryController.convertCsvFileToJson);

// we can use PATCH to replce some values or use PUT to replace whole item
router.patch('/:id', inventoryController.updateInventoryItem);

router.delete('/:id', inventoryController.deleteInventoryItem);

module.exports = router;
