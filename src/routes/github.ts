import express from "express";
import { fetchCommits } from "../services/githubService";

const router = express.Router();

router.get("/commits", async (req, res) => {
  const owner = (req.query.owner as string) || "Basharfrancis";
  const repo = (req.query.repo as string) || "devtrack";

  try {
    const commits = await fetchCommits(owner, repo);
    res.json(commits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching commits" });
  }
});

export default router;
