import bcrypt from "bcryptjs";
import express from "express";
import { requireAuth, requireStaff, signUser } from "../middleware/auth.js";
import { publicUser, store } from "../data/store.js";

export const authRouter = express.Router();

function login(req, res, mode) {
  const { email, password } = req.body;
  const user = store.users.find((item) => item.email.toLowerCase() === String(email || "").toLowerCase());

  if (!user || !bcrypt.compareSync(String(password || ""), user.passwordHash)) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  if (mode === "staff" && !user.roles.includes("staff")) {
    return res.status(403).json({ message: "This account cannot use staff login." });
  }

  return res.json({ token: signUser(user), user: publicUser(user) });
}

authRouter.post("/public/login", (req, res) => login(req, res, "public"));
authRouter.post("/staff/login", (req, res) => login(req, res, "staff"));
authRouter.get("/public/me", requireAuth, (req, res) => res.json({ user: req.publicUser }));
authRouter.get("/staff/me", requireAuth, requireStaff, (req, res) => res.json({ user: req.publicUser }));
authRouter.post("/public/logout", (_req, res) => res.json({ ok: true }));
authRouter.post("/staff/logout", (_req, res) => res.json({ ok: true }));
