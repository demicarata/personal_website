import { useState, useEffect } from "react";

interface Resource {
    _id: string;
    title: string;
    link: string;
    type?: 'article' | 'video' | 'book';
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
            <p>Links to a bunch of articles, videos or books that I found interesting. Related or unrelated to cybersecurity.</p>

            <div className="mt-8 space-y-8">
                {resources.length === 0 ? (
                    <p className="text-gray-400">No resources added yet.</p>
                ) : (
                    <>
                        {/* Articles Section */}
                        {resources.filter(resource => resource.type === 'article' || !resource.type).length > 0 && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-amber-200 flex items-center gap-2">
                                    Articles
                                </h2>
                                <ul className="list-disc ml-6 space-y-2">
                                    {resources
                                        .filter(resource => resource.type === 'article' || !resource.type)
                                        .map((resource) => (
                                            <li key={resource._id}>
                                                <a
                                                    href={resource.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-amber-400 underline hover:text-amber-600 transition-colors"
                                                >
                                                    {resource.title}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )}

                        {/* Videos Section */}
                        {resources.filter(resource => resource.type === 'video').length > 0 && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-amber-200 flex items-center gap-2">
                                    Videos
                                </h2>
                                <ul className="list-disc ml-6 space-y-2">
                                    {resources
                                        .filter(resource => resource.type === 'video')
                                        .map((resource) => (
                                            <li key={resource._id}>
                                                <a
                                                    href={resource.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-amber-400 underline hover:text-amber-600 transition-colors"
                                                >
                                                    {resource.title}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )}

                        {/* Books Section */}
                        {resources.filter(resource => resource.type === 'book').length > 0 && (
                            <div>
                                <h2 className="text-2xl font-semibold mb-4 text-amber-200 flex items-center gap-2">
                                    Books
                                </h2>
                                <ul className="list-disc ml-6 space-y-2">
                                    {resources
                                        .filter(resource => resource.type === 'book')
                                        .map((resource) => (
                                            <li key={resource._id}>
                                                <a
                                                    href={resource.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-amber-400 underline hover:text-amber-600 transition-colors"
                                                >
                                                    {resource.title}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}