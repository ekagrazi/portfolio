const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Not authorized — no token provided.' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    const message = err.name === 'TokenExpiredError'
      ? 'Session expired — please log in again.'
      : 'Not authorized — invalid token.';
    return res.status(401).json({ message });
  }
};

module.exports = { protect };
