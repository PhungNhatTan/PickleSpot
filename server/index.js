// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

console.log('BOOT from', __filename);        // <-- giúp bạn nhìn đúng file đang chạy

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const JWT_SECRET = (process.env.JWT_SECRET || '').length >= 32
  ? process.env.JWT_SECRET
  : 'CHANGE_THIS_TO_A_32+_CHAR_SECRET_1234567890abcd';
const TOKEN_TTL_SEC = Number(process.env.JWT_TTL || 3600);

// demo users
const USERS = {
  user:  { password: 'password',  role: 'USER'  },
  admin: { password: 'admin123',  role: 'ADMIN' }
};

// blacklist in-memory: token -> exp
const blacklist = new Map();
const isBlacklisted = (t) => {
  const exp = blacklist.get(t);
  if (!exp) return false;
  const now = Math.floor(Date.now()/1000);
  if (exp <= now) { blacklist.delete(t); return false; }
  return true;
};
setInterval(() => {
  const now = Math.floor(Date.now()/1000);
  for (const [t, exp] of blacklist) if (exp <= now) blacklist.delete(t);
}, 60_000);

const signToken = (sub, role) => jwt.sign({ sub, role }, JWT_SECRET, { expiresIn: TOKEN_TTL_SEC });
const verify = (t) => jwt.verify(t, JWT_SECRET);
const decode  = (t) => jwt.decode(t);

// healthcheck
app.get('/health', (_req, res) => res.json({ ok: true }));

// auth
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body || {};
  const u = USERS[username];
  if (!u || u.password !== password) return res.status(401).json({ error: 'Invalid credentials' });
  const token = signToken(username, u.role);
  res.json({ token, tokenType: 'Bearer' });
});

app.post('/api/auth/logout', (req, res) => {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return res.status(400).json({ error: 'Missing Authorization: Bearer <token>' });
  const token = auth.slice(7).trim();
  const dec = decode(token);
  if (!dec?.exp) return res.status(400).json({ error: 'Invalid token' });
  blacklist.set(token, dec.exp);
  res.json({ message: 'Logged out (token invalidated until expiry).' });
});

app.get('/api/auth/hello', (req, res) => {
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Missing Authorization: Bearer <token>' });
  const token = auth.slice(7).trim();
  if (isBlacklisted(token)) return res.status(401).json({ error: 'Token is blacklisted (logged out).' });
  try {
    const user = verify(token);
    res.json({ message: `Hello, ${user.sub}!`, role: user.role });
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
