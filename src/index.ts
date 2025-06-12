import express from "express";
import dotenv from "dotenv";

import githubRoutes from "./routes/github";

dotenv.config();
const app = express();

app.use("/api/github", githubRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
