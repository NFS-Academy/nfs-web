import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { publicUser, store } from "../data/store.js";

export function signUser(user) {
  return jwt.sign({ sub: user.id, roles: user.roles }, config.jwtSecret, { expiresIn: "8h" });
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token) {
    return res.status(401).json({ message: "Missing auth token." });
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    const user = store.users.find((item) => item.id === payload.sub);
    if (!user || user.status !== "active") {
      return res.status(401).json({ message: "Invalid user." });
    }
    req.user = user;
    req.publicUser = publicUser(user);
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}

export function requireStaff(req, res, next) {
  if (!req.user?.roles.includes("staff")) {
    return res.status(403).json({ message: "Staff access required." });
  }
  return next();
}
