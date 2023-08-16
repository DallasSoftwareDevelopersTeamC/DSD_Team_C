const express = require('express');
const inventory = require('../controllers/inventory');
const router = express.Router();
const inventoryController = require('../controllers/inventory');
const { authenticate } = require("../controllers/authentication");

/* function logReqUser(req, res, next) {
  console.log("req.user -----1-1-1-1-1-1-1:", req.user);
  next();
} */

router.get(
  "/:filterBy/:sortOrder",
  authenticate,
  //   logReqUser,
  inventoryController.getInventoryList
);
router.get("/", authenticate, inventoryController.getInventoryList);
// router.get('/:id', inventoryController.getInventoryItem);

router.post("/", authenticate, inventoryController.createInventoryItem);
router.post("/upload", authenticate, inventoryController.convertCsvFileToJson);
router.post(
  "/bulk",
  authenticate,
  inventoryController.createManyInventoryItems
);

// we can use PATCH to replce some values or use PUT to replace whole item
router.patch("/:id", authenticate, inventoryController.updateInventoryItem);

router.delete("/bulk", authenticate, inventoryController.deleteInventoryItems);

module.exports = router;
