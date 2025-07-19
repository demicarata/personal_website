import { useState, useEffect } from "react";

interface Resource {
    _id: string;
    title: string;
    link: string;
    createdAt: string;
    updatedAt: string;
}

export default function Resources() {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/resources');
                if (!response.ok) {
                    throw new Error('Failed to fetch resources');
                }
                const data = await response.json();
                setResources(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    if (loading) {
        return (
            <div>
                <h1 className="text-4xl font-semibold">Resources</h1>
                <p>Loading resources...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1 className="text-4xl font-semibold">Resources</h1>
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-4xl font-semibold">Resources</h1>
            <p> Links to a bunch of articles, videos or books that I found interesting. Related or unrelated to cybersecurity. </p>

            <div className="mt-4 space-y-4">
                {resources.length === 0 ? (
                    <p className="text-gray-400">No resources added yet.</p>
                ) : (
                    <ul className="list-disc pl-6">
                        {resources.map((resource) => (
                            <li key={resource._id}>
                                <a
                                    href={resource.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-amber-400 underline hover:text-amber-600"
                                >
                                    {resource.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}