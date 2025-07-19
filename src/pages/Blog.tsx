import {Link} from "react-router-dom";
import { useState, useEffect } from "react";

interface Article {
    _id: string;
    title: string;
    description: string;
    content: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
}

export default function Blog() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/articles');
                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }
                const data = await response.json();
                setArticles(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return (
            <div>
                <h1 className="text-4xl font-semibold">Blog</h1>
                <p>Loading articles...</p>
            </div>
        );
    }

    // Usually server wasn't started
    if (error) {
        return (
            <div>
                <h1 className="text-4xl font-semibold">Blog</h1>
                <p className="text-red-500">Error: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-4xl font-semibold">Blog</h1>
            <p>Here you can find some of the things I wrote.</p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {articles.map((article) => (
                    <Link
                        to={`/article/${article._id}`}
                        key={article._id}
                        className="border p-4 shadow-lg hover:border-amber-500 transition duration-100"
                    >
                        <img
                            src={article.image || "./assets/garf.jpg"}
                            alt={article.title}
                            className="w-full h-48 object-cover"
                        />
                        <h2 className="text-xl font-semibold mt-4">{article.title}</h2>
                        <p className="text-gray-400">{article.description}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Added on: {new Date(article.createdAt).toLocaleDateString('en-GB')}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}