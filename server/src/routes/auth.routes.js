'use strict';
const router = require('express').Router();
const authRequired = require('../middleware/authRequired');
const { signToken, revokeUntilExpiry } = require('../utils/jwt.util');

// demo users (in-memory)
const USERS = {
  user:  { password: 'password',  role: 'USER'  },
  admin: { password: 'admin123',  role: 'ADMIN' }
};

// POST /api/auth/login -> { token, tokenType }
router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  const u = USERS[username];
  if (!u || u.password !== password) return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken(username, u.role);
  res.json({ token, tokenType: 'Bearer' });
});

// POST /api/auth/logout -> blacklist token tới khi hết hạn
router.post('/logout', (req, res) => {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return res.status(400).json({ error: 'Missing Authorization: Bearer <token>' });

  const token = auth.slice(7).trim();
  try { revokeUntilExpiry(token); res.json({ message: 'Logged out (token invalidated until expiry).' }); }
  catch { res.status(400).json({ error: 'Invalid token' }); }
});

// GET /api/auth/hello (protected)
router.get('/hello', authRequired, (req, res) => {
  res.json({ message: `Hello, ${req.user.sub}!`, role: req.user.role });
});

module.exports = router;
