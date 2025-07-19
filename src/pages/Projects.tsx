import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Project {
    _id: string;
    title: string;
    description: string;
    content: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
                try {
                    const response = await fetch('http://localhost:4000/api/projects');
                    if (!response.ok) {
                        throw new Error('Failed to fetch projects');
                    }
                    const data = await response.json();
                    setProjects(data);
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'An error occurred');
                } finally {
                    setLoading(false);
                }
            };

            fetchProjects();
        }, []);
    
        if (loading) {
            return (
                <div>
                    <h1 className="text-4xl font-semibold">Projects</h1>
                    <p>Loading projects...</p>
                </div>
            );
        }
    
        // Usually server wasn't started
        if (error) {
            return (
                <div>
                    <h1 className="text-4xl font-semibold">Projects</h1>
                    <p className="text-red-500">Error: {error}</p>
                </div>
            );
        }
    return (
        <div>
            <h1 className="text-4xl font-semibold">Projects</h1>
            <p> Some projects that I worked on and took the time to document. </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {projects.map((project) => (
                    <Link
                        to={`/project/${project._id}`}
                        key={project._id}
                        className="border p-4 shadow-lg hover:border-amber-400 transition duration-100"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <h2 className="text-xl font-semibold mt-4">{project.title}</h2>
                        <p className="text-gray-400">{project.description}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Added on: {project.createdAt}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}