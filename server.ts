import express from "express";
import { RequestHandler } from "express";
import { Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Article } from "./models/Article";
import { Project } from "./models/Project";
import { Resource } from "./models/Resource";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


const app = express();
app.use(cors());
app.use(express.json());

// All projects
app.get("/api/projects", async (_req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Project by ID
const getProjectById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ error: "Failed to fetch project" });
  }
};

app.get("/api/projects/:id", getProjectById);

// Create new project
app.post("/api/projects", async (req, res) => {
  try {
    const { title, description, content, image } = req.body;
    
    if (!title || !description || !content) {
      res.status(400).json({ error: "Title, description, and content are required" });
      return;
    }

    const project = new Project({
      title,
      description,
      content,
      image: image || "" // Make image optional
    });

    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// All articles
app.get("/api/articles", async (_req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// Article by ID
const getArticleById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      res.status(404).json({ error: "Article not found" });
      return;
    }
    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "Failed to fetch article" });
  }
};

app.get("/api/articles/:id", getArticleById);

// Create new article
app.post("/api/articles", async (req, res) => {
  try {
    const { title, description, content, image } = req.body;
    
    if (!title || !description || !content) {
      res.status(400).json({ error: "Title, description, and content are required" });
      return;
    }

    const article = new Article({
      title,
      description,
      content,
      image: image || "" // Make image optional
    });

    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ error: "Failed to create article" });
  }
});

// All resources
app.get("/api/resources", async (_req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).json({ error: "Failed to fetch resources" });
  }
});

// Resource by ID
const getResourceById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      res.status(404).json({ error: "Resource not found" });
      return;
    }
    res.json(resource);
  } catch (error) {
    console.error("Error fetching resource:", error);
    res.status(500).json({ error: "Failed to fetch resource" });
  }
};

app.get("/api/resources/:id", getResourceById);

// Create new resource
app.post("/api/resources", async (req, res) => {
  try {
    const { title, link } = req.body;
    
    if (!title || !link) {
      res.status(400).json({ error: "Title and link are required" });
      return;
    }

    const resource = new Resource({
      title,
      link
    });

    const savedResource = await resource.save();
    res.status(201).json(savedResource);
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(500).json({ error: "Failed to create resource" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
