const express     = require('express');
const mongoose    = require('mongoose');
const cors        = require('cors');
const helmet      = require('helmet');
const compression = require('compression');
const rateLimit   = require('express-rate-limit');
require('dotenv').config();

const contactRoutes = require('./routes/contact');
const authRoutes    = require('./routes/auth');
const settingsRoutes = require('./routes/settings');

const app = express();

// ── Security Middleware ───────────────────────────────────────────────────
// Helmet sets various HTTP headers for security
app.use(helmet());

// Gzip compression for all responses
app.use(compression());

// CORS — allow frontend origins
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow non-browser clients like Postman
    
    const allowed = [
      process.env.CLIENT_URL,
      'http://localhost:5173',
      'https://ekagrazi.com',
      'https://www.ekagrazi.com'
    ];
    
    // Allow exactly matched domains, or any vercel.app subdomain
    if (allowed.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Body parser with size limit
app.use(express.json({ limit: '1mb' }));

// ── Rate Limiting ─────────────────────────────────────────────────────────
// General rate limit: 100 requests per 15 minutes per IP
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});

// Strict rate limit for auth: 10 attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many login attempts, please try again later.' },
});

// Strict rate limit for contact form: 5 messages per 15 minutes per IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many messages sent. Please try again later.' },
});

app.use('/api/', generalLimiter);
app.use('/api/auth/login', authLimiter);
app.use('/api/contact', contactLimiter);

// ── Trust proxy (required for rate limiting behind Render/Vercel proxies) ──
app.set('trust proxy', 1);

// ── Routes ─────────────────────────────────────────────────────────────────
app.use('/api/contact', contactRoutes);
app.use('/api/auth',    authRoutes);
app.use('/api/settings', settingsRoutes);

// Health check — used by Render keep-alive ping (exempt from rate limit)
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ── Global error handler ───────────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ message: 'Internal server error.' });
});

// ── Connect DB then start server ───────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✓ Connected to MongoDB Atlas');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✓ Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('✗ MongoDB connection failed:', err.message);
    process.exit(1);
  });
