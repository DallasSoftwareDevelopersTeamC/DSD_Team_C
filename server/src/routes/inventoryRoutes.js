import express from 'express';
import * as inventoryController from '../controllers/inventory.js';
import { authenticate } from "../controllers/authentication.js";

const router = express.Router();

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

// we can use PATCH to replace some values or use PUT to replace whole item
router.patch("/:id", authenticate, inventoryController.updateInventoryItem);

router.delete("/bulk", authenticate, inventoryController.deleteInventoryItems);

export default router;
