import express from "express";
import githubRouter from "./routes/github";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use("/api/github", githubRouter);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
