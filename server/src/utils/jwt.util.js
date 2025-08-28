import jwt from "jsonwebtoken";

const FALLBACK = "CHANGE_THIS_TO_A_32+_CHAR_SECRET_1234567890abcd";
const JWT_SECRET =
  (process.env.JWT_SECRET || "").length >= 32
    ? process.env.JWT_SECRET
    : FALLBACK;

const TOKEN_TTL_SEC = Number(process.env.JWT_TTL || 3600);

// In-memory blacklist: token -> exp (UNIX seconds)
const blacklist = new Map();

function isBlacklisted(token) {
  const exp = blacklist.get(token);
  if (!exp) {return false};

  const now = Math.floor(Date.now() / 1000);
  if (exp <= now) {
    blacklist.delete(token);
    return false;
  }
  return true;
}

// Cleanup expired blacklisted tokens every 60s
setInterval(() => {
  const now = Math.floor(Date.now() / 1000);
  for (const [token, exp] of blacklist) {
    if (exp <= now) {
      blacklist.delete(token);
    }
  }
}, 60_000);

const signToken = (sub, role, extra = {}) =>
  jwt.sign({ sub, role, ...extra }, JWT_SECRET, { expiresIn: TOKEN_TTL_SEC });

const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
const decode = (token) => jwt.decode(token);

function revokeUntilExpiry(token) {
  const decoded = decode(token);
  if (!decoded?.exp) { throw new Error("Invalid token") };
  blacklist.set(token, decoded.exp);
}

export { signToken, verifyToken, decode, revokeUntilExpiry, isBlacklisted };
