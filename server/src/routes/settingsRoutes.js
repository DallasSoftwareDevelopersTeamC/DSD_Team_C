import express from 'express';
import * as settingsController from '../controllers/settings.js';

const router = express();

router.get('/:username', settingsController.getSettings);

// we can use PATCH to replace some values or use PUT to replace the whole item
router.patch('/:username', settingsController.updateSetting);

export default router;
