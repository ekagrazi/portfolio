const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const Admin   = require('../models/Admin');
const { protect } = require('../middleware/authMiddleware');

// ── POST /api/auth/login ───────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials.' });

    const match = await admin.comparePassword(password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials.' });

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, expiresIn: '7d', admin: { email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── GET /api/auth/verify ───────────────────────────────────────────────────
router.get('/verify', protect, (req, res) => {
  res.json({ valid: true, admin: { email: req.admin.email } });
});

module.exports = router;
