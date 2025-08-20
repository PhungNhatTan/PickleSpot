// src/middlewares/authRequired.js
import { verifyToken, isBlacklisted } from "../utils/jwt.util.js";

export default function authRequired(req, res, next) {
  const auth = req.headers.authorization || "";

  if (!auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing Authorization: Bearer <token>" });
  }

  const token = auth.slice(7).trim();

  if (!token) {
    return res.status(401).json({ error: "Invalid Authorization header" });
  }

  if (isBlacklisted(token)) {
    return res.status(401).json({ error: "Token is blacklisted (logged out)." });
  }

  try {
    req.user = verifyToken(token); // note: renamed for clarity
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
