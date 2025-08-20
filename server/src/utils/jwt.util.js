'use strict';
const jwt = require('jsonwebtoken');

const FALLBACK = 'CHANGE_THIS_TO_A_32+_CHAR_SECRET_1234567890abcd';
const JWT_SECRET = (process.env.JWT_SECRET || '').length >= 32 ? process.env.JWT_SECRET : FALLBACK;
const TOKEN_TTL_SEC = Number(process.env.JWT_TTL || 3600);

// In-memory blacklist: token -> exp (UNIX seconds)
const blacklist = new Map();
function isBlacklisted(t) {
  const exp = blacklist.get(t);
  if (!exp) {return false};
  const now = Math.floor(Date.now() / 1000);
  if (exp <= now) { blacklist.delete(t); return false; }
  return true;
}
setInterval(() => {
  const now = Math.floor(Date.now() / 1000);
  for (const [t, exp] of blacklist) {if (exp <= now) {blacklist.delete(t)}};
}, 60_000);

const signToken = (sub, role, extra = {}) => jwt.sign({ sub, role, ...extra }, JWT_SECRET, { expiresIn: TOKEN_TTL_SEC });
const verify = (t) => jwt.verify(t, JWT_SECRET);
const decode = (t) => jwt.decode(t);
function revokeUntilExpiry(t) { const d = decode(t); if (!d?.exp) {throw new Error('Invalid token')}; blacklist.set(t, d.exp); }

module.exports = { signToken, verify, decode, revokeUntilExpiry, isBlacklisted };
