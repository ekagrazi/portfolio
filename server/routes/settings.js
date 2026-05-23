const express = require('express');
const router  = express.Router();
const Settings = require('../models/Settings');
const { protect } = require('../middleware/authMiddleware');

// ── GET /api/settings ──────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ resumeDriveLink: '' });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PUT /api/settings ──────────────────────────────────────────────────────
router.put('/', protect, async (req, res) => {
  try {
    const { resumeDriveLink } = req.body;
    let settings = await Settings.findOne();
    
    if (!settings) {
      settings = await Settings.create({ resumeDriveLink });
    } else {
      settings.resumeDriveLink = resumeDriveLink;
      await settings.save();
    }
    
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
