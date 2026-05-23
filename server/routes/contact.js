const express    = require('express');
const router     = express.Router();
const nodemailer = require('nodemailer');
const Message    = require('../models/Message');
const { protect } = require('../middleware/authMiddleware');

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── POST /api/contact ──────────────────────────────────────────────────────
// Public. Validates, saves to DB, sends two emails.
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' });
  }

  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    await Message.create({ name, email, subject, message, ip });

    // Email to Ekagra
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to:      process.env.ADMIN_EMAIL,
      subject: `[Portfolio] ${subject?.trim() || 'New message'} — from ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;padding:32px;border-radius:4px;">
          <h2 style="margin:0 0 20px;font-size:18px;border-bottom:1px solid #222;padding-bottom:14px;">
            New Portfolio Message
          </h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr><td style="padding:6px 0;color:#888;width:80px;">Name</td><td style="padding:6px 0;font-weight:600;">${name}</td></tr>
            <tr><td style="padding:6px 0;color:#888;">Email</td><td style="padding:6px 0;"><a href="mailto:${email}" style="color:#fff;">${email}</a></td></tr>
            <tr><td style="padding:6px 0;color:#888;">Subject</td><td style="padding:6px 0;">${subject || '—'}</td></tr>
          </table>
          <div style="padding:16px;background:#111;border-left:2px solid #333;line-height:1.7;font-size:14px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    });

    // Confirmation to sender
    await transporter.sendMail({
      from:    `"Ekagra Gupta" <${process.env.EMAIL_USER}>`,
      to:      email,
      subject: `Got your message, ${name}!`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#ffffff;padding:32px;border-radius:4px;">
          <h2 style="margin:0 0 12px;font-size:18px;">Hey ${name}, thanks for reaching out!</h2>
          <p style="color:#aaa;line-height:1.8;font-size:14px;">
            I've received your message and will get back to you within 24–48 hours.<br>
            Feel free to check out my work on <a href="https://github.com/ekagrazi" style="color:#fff;">GitHub</a> 
            or connect on <a href="https://linkedin.com/in/ekagrazi" style="color:#fff;">LinkedIn</a>.
          </p>
          <hr style="border-color:#222;margin:24px 0;">
          <p style="color:#555;font-size:12px;margin:0;">
            Ekagra Gupta · Full-Stack Developer | AI/ML Engineer | Cybersecurity Enthusiast<br>
            VIT Bhopal University, Sehore, Madhya Pradesh
          </p>
        </div>
      `,
    });

    res.json({ message: "Message sent! I'll get back to you soon." });

  } catch (err) {
    console.error('Contact error:', err);
    res.status(500).json({
      message: 'Failed to send message. Please try again or email me directly at ekagragupta814@gmail.com',
    });
  }
});

// ── GET /api/contact/messages ──────────────────────────────────────────────
// Protected — admin only.
router.get('/messages', protect, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).select('-ip');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── PATCH /api/contact/messages/:id/read ──────────────────────────────────
router.patch('/messages/:id/read', protect, async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ message: 'Message not found.' });
    res.json(msg);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ── DELETE /api/contact/messages/:id ──────────────────────────────────────
router.delete('/messages/:id', protect, async (req, res) => {
  try {
    const msg = await Message.findByIdAndDelete(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found.' });
    res.json({ message: 'Deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
