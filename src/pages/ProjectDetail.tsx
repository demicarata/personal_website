import { useParams } from "react-router-dom";
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

export default function ProjectDetail() {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) {
                setError("Invalid project ID");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/api/projects/${id}`);
                if (!response.ok) {
                    throw new Error('Project not found');
                }
                const data = await response.json();
                setProject(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return <div className="p-8">Loading project...</div>;
    }

    if (error || !project) {
        return <div className="p-8 text-red-500">Error: {error || 'Project not found'}</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-4xl font-semibold">{project.title}</h1>
            <img
                src={project.image}
                alt={project.title}
                className="mt-4 w-full h-96 object-cover"
            />
            <p className="mt-4 text-lg">{project.description}</p>
            <div className="mt-6 text-gray-200 whitespace-pre-wrap">
                {project.content}
            </div>
            <p className="mt-4 text-sm text-gray-500">
                Published on: {new Date(project.createdAt).toLocaleDateString()}
            </p>
        </div>
    );
}

        
