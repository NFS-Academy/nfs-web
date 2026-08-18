import express from "express";
import { store } from "../data/store.js";
import { requireAuth } from "../middleware/auth.js";

export const progressRouter = express.Router();

progressRouter.get("/summary", requireAuth, (req, res) => {
  const userProgress = store.progress.filter((item) => item.userId === req.user.id);
  res.json({
    completed: userProgress.filter((item) => item.status === "completed").length,
    touched: userProgress.length,
    recent: userProgress.slice(-5).reverse()
  });
});

progressRouter.post("/", requireAuth, (req, res) => {
  const { conceptId, simulationId, status = "in_progress", score = 0 } = req.body;
  const item = {
    id: `progress_${Date.now()}`,
    userId: req.user.id,
    conceptId,
    simulationId,
    status,
    score,
    updatedAt: new Date().toISOString()
  };
  store.progress.push(item);
  res.status(201).json({ progress: item });
});
