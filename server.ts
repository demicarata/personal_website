import express from "express";
import { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());
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
app.get("/api/projects", (_req: Request, res: Response) => {
  res.json(projects);
});

// Project by ID
app.get("/api/projects/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const project = projects.find((p) => p.id === id);
  if (!project) return res.status(404).json({ error: "Project not found" });
  res.json(project);
});

// All articles
app.get("/api/articles", (_req: Request, res: Response) => {
  res.json(articles);
});

// Article by ID
app.get("/api/articles/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const article = articles.find((a) => a.id === id);
  if (!article) return res.status(404).json({ error: "Article not found" });
  res.json(article);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
