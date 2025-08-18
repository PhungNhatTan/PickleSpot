// server/jwt-auth.js
'use strict';

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ====== Config ======
const PORT = Number(process.env.PORT || 8081);               // đổi nếu cần
const JWT_SECRET = process.env.JWT_SECRET
  || 'CHANGE_THIS_TO_A_32+_CHAR_SECRET_1234567890abcd';      // >=32 ký tự
const TOKEN_TTL_SEC = Number(process.env.JWT_TTL || 3600);   // 1h

// ====== Demo user store (in-memory) ======
const USERS = {
  user:  { password: 'password',  role: 'USER'  },
  admin: { password: 'admin123',  role: 'ADMIN' }
};

// ====== Token blacklist (in-memory) ======
/** Map: token -> exp (UNIX seconds) */
const blacklist = new Map();
function isBlacklisted(token) {
  const exp = blacklist.get(token);
  if (!exp) return false;
  // tự dọn khi quá hạn
  const now = Math.floor(Date.now() / 1000);
  if (exp <= now) { blacklist.delete(token); return false; }
  return true;
}
// dọn định kỳ
setInterval(() => {
  const now = Math.floor(Date.now() / 1000);
  for (const [t, exp] of blacklist) if (exp <= now) blacklist.delete(t);
}, 60_000);

// ====== Helpers ======
function signToken(username, role) {
  return jwt.sign({ sub: username, role }, JWT_SECRET, { expiresIn: TOKEN_TTL_SEC });
}

function authRequired(req, res, next) {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing Authorization: Bearer <token>' });
  }
  const token = auth.slice(7);
  if (isBlacklisted(token)) {
    return res.status(401).json({ error: 'Token is blacklisted (logged out).' });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;       // { sub, role, iat, exp }
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ====== Routes ======

// Login: { username, password } -> { token, tokenType }
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};
  const u = USERS[username];
  if (!u || u.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = signToken(username, u.role);
  return res.json({ token, tokenType: 'Bearer' });
});

// Logout: Authorization: Bearer <token> -> blacklist token tới khi hết hạn
app.post('/api/auth/logout', (req, res) => {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) {
    return res.status(400).json({ error: 'Missing Authorization: Bearer <token>' });
  }
  const token = auth.slice(7);
  const decoded = jwt.decode(token); // không verify để lấy exp kể cả token sắp hết hạn
  if (!decoded || !decoded.exp) {
    return res.status(400).json({ error: 'Invalid token' });
  }
  blacklist.set(token, decoded.exp);
  return res.json({ message: 'Logged out (token invalidated until expiry).' });
});

// Endpoint mẫu bảo vệ
app.get('/api/hello', authRequired, (req, res) => {
  res.json({ message: `Hello, ${req.user.sub}!`, role: req.user.role });
});

app.listen(PORT, () => {
  console.log(`JWT auth server listening on http://localhost:${PORT}`);
});
