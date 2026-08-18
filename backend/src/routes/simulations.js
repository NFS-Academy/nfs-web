import express from "express";
import { store } from "../data/store.js";
import { requireAuth } from "../middleware/auth.js";

export const simulationsRouter = express.Router();

simulationsRouter.get("/:simulationId", requireAuth, (req, res) => {
  const simulation = store.simulations.find((item) => item.id === req.params.simulationId);
  if (!simulation) return res.status(404).json({ message: "Simulation not found." });

  const concept = store.concepts.find((item) => item.id === simulation.conceptId);
  const formulas = (concept?.formulas || []).map((id) => store.formulas.find((formula) => formula.id === id)).filter(Boolean);

  return res.json({
    simulation: {
      ...simulation,
      conceptTitle: concept?.title || "",
      formulas
    }
  });
});

simulationsRouter.post("/:simulationId/attempts", requireAuth, (req, res) => {
  const simulation = store.simulations.find((item) => item.id === req.params.simulationId);
  if (!simulation) return res.status(404).json({ message: "Simulation not found." });

  const attempt = {
    id: `attempt_${Date.now()}`,
    userId: req.user.id,
    simulationId: simulation.id,
    values: req.body.values || {},
    result: req.body.result || {},
    createdAt: new Date().toISOString()
  };

  store.attempts.push(attempt);
  return res.status(201).json({ attempt });
});
