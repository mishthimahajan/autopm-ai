import express from "express";
import Task from "../models/Task.js";
import Log from "../models/Log.js";
import { extractTasks } from "../agents/extractAgent.js";
import { checkEscalation } from "../agents/escalationAgent.js";

const router = express.Router();


router.post("/process", async (req, res) => {
  try {
    const { transcript } = req.body;

    console.log("Transcript:", transcript);

    const tasks = extractTasks(transcript); // ✅ THIS LINE

    console.log("Generated Tasks:", tasks); // 🔥 DEBUG

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  const tasks = await Task.find();
  const checked = checkEscalation(tasks);
  res.json(checked);
});

export default router;