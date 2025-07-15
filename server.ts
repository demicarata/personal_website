import express from "express";
import { RequestHandler } from "express";
import { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


const app = express();
//app.use(cors());
app.use(express.json());

const projects = [
  {
    id: 1,
    title: "Project One",
    description: "This is a description of project one.",
    image: "https://via.placeholder.com/300",
    createdAt: "2021-09-01",
  },
  {
    id: 2,
    title: "Project Two",
    description: "This is a description of project two.",
    image: "https://via.placeholder.com/300",
    createdAt: "2021-09-01",
  },
];

const articles = [
  {
    id: 1,
    title: "My first blog post",
    createdAt: "2021-01-01",
    content: "This is my first blog post.",
    image: "/assets/garf.jpg",
    description: "This is a description of my first blog post.",
  },
];

// All projects
app.get("/api/projects", (_req, res) => {
  res.json(projects);
});

// Project by ID
const getProjectById: RequestHandler<{ id: string }> = (req, res) => {
  const id = Number(req.params.id);
  const project = projects.find((p) => p.id === id);
  if (!project) {
    res.status(404).json({ error: "Project not found" });
    return;
  }
  res.json(project);
};

app.get("/api/projects/:id", getProjectById);

// All articles
app.get("/api/articles", (_req, res) => {
  res.json(articles);
});

// Article by ID
// Using this request handler Frankestein monster because everything else failed
const getArticleById: RequestHandler<{ id: string }> = (req, res) => {
  const id = Number(req.params.id);
  const article = articles.find((a) => a.id === id);
  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  res.json(article);
};

app.get("/api/articles/:id", getArticleById);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
