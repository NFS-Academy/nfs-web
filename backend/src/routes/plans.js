import express from "express";
import { store } from "../data/store.js";

export const plansRouter = express.Router();

plansRouter.get("/", (_req, res) => {
  res.json({ plans: store.plans });
});
