import express from "express";
import { staffStats, store } from "../data/store.js";
import { requireAuth, requireStaff } from "../middleware/auth.js";

export const staffRouter = express.Router();

staffRouter.use(requireAuth, requireStaff);

staffRouter.get("/dashboard", (_req, res) => {
  res.json({
    stats: staffStats(),
    reviewQueue: [
      { id: "review_physics_momentum", title: "Momentum Lab", status: "math review" },
      { id: "review_neutralization", title: "Acid-Base Neutralization", status: "QA preview" },
      { id: "review_dry_cell", title: "Dry Cell Behavior", status: "R&D review" }
    ],
    recentContent: store.simulations.map((item) => ({
      id: item.id,
      title: item.title,
      templateType: item.templateType,
      accessTier: item.accessTier
    }))
  });
});
