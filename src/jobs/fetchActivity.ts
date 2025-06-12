import { fetchCommits } from "../services/githubService";

const runJob = async () => {
  const commits = await fetchCommits("Basharfrancis", "devtrack");
  console.log(commits[0]);
};

runJob();
