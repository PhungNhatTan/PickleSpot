import jwt from "jsonwebtoken";
import { JWT_SECRET, TOKEN_TTL_SEC } from "../config/env.js";

// blacklist in-memory: token -> exp
const blacklist = new Map();

function isBlacklisted(token) {
  const exp = blacklist.get(token);
  if (!exp) {return false};
  const now = Math.floor(Date.now() / 1000);
  if (exp <= now) { blacklist.delete(token); return false; }
  return true;
}

// cleanup expired tokens every minute
setInterval(() => {
  const now = Math.floor(Date.now() / 1000);
  for (const [t, exp] of blacklist) {
    if (exp <= now) {blacklist.delete(t)};
  }
}, 60_000);

function signToken(sub, role) {
  return jwt.sign({ sub, role }, JWT_SECRET, { expiresIn: TOKEN_TTL_SEC });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function decodeToken(token) {
  return jwt.decode(token);
}

function blacklistToken(token, exp) {
  blacklist.set(token, exp);
}

export { signToken, verifyToken, decodeToken, blacklistToken, isBlacklisted };
