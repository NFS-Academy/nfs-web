import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { config } from "./config.js";
import { authRouter } from "./routes/auth.js";
import { catalogRouter } from "./routes/catalog.js";
import { plansRouter } from "./routes/plans.js";
import { progressRouter } from "./routes/progress.js";
import { simulationsRouter } from "./routes/simulations.js";
import { staffRouter } from "./routes/staff.js";

const app = express();

app.use(cors({ origin: config.clientOrigin, credentials: true }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "Naim Science Lab API",
    mongo: mongoose.connection.readyState === 1 ? "connected" : "not-connected"
  });
});

app.use("/api/auth", authRouter);
app.use("/api/catalog", catalogRouter);
app.use("/api/simulations", simulationsRouter);
app.use("/api/progress", progressRouter);
app.use("/api/staff", staffRouter);
app.use("/api/plans", plansRouter);

app.use((req, res) => {
  res.status(404).json({ message: `No route for ${req.method} ${req.path}` });
});

async function start() {
  if (config.mongoUri) {
    try {
      await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 1500 });
      console.log("MongoDB connected.");
    } catch (error) {
      console.warn("MongoDB unavailable; using seeded in-memory MVP data.");
      console.warn(error.message);
    }
  }

  app.listen(config.port, config.host, () => {
    console.log(`API running on http://${config.host}:${config.port}`);
  });
}

start();
