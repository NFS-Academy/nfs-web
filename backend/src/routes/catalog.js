import express from "express";
import { getConceptPayload, store } from "../data/store.js";
import { requireAuth } from "../middleware/auth.js";

export const catalogRouter = express.Router();

catalogRouter.get("/bootstrap", (_req, res) => {
  res.json({
    grades: store.grades,
    subjects: store.subjects,
    chapters: store.chapters,
    featuredConcepts: store.concepts.slice(0, 6),
    plans: store.plans
  });
});

catalogRouter.get("/grades", (_req, res) => res.json({ grades: store.grades }));

catalogRouter.get("/grades/:gradeId/subjects", (req, res) => {
  res.json({ subjects: store.subjects.filter((subject) => subject.gradeId === req.params.gradeId) });
});

catalogRouter.get("/subjects/:subjectId/chapters", (req, res) => {
  res.json({ chapters: store.chapters.filter((chapter) => chapter.subjectId === req.params.subjectId) });
});

catalogRouter.get("/chapters/:chapterId/concepts", (req, res) => {
  res.json({ concepts: store.concepts.filter((concept) => concept.chapterId === req.params.chapterId) });
});

catalogRouter.get("/concepts/:conceptId", requireAuth, (req, res) => {
  const concept = getConceptPayload(req.params.conceptId);
  if (!concept) return res.status(404).json({ message: "Concept not found." });
  return res.json({ concept });
});
