import axios from "axios";

const BASE_URL = "https://api.github.com";

export const fetchCommits = async (owner: string, repo: string) => {
  const res = await axios.get(`${BASE_URL}/repos/${owner}/${repo}/commits`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "User-Agent": "devtrack-app",
    },
    params: {
      per_page: 20,
    },
  });
  return res.data;
};
