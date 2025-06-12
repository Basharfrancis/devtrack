import express from "express";
import { fetchCommits } from "../services/githubService";

const router = express.Router();
router.get("/commits", async (req, res) => {
  const data = await fetchCommits("Basharfrancis", "devtrack");
  res.json(data);
});

export default router;
