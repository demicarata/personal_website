import {useParams} from "react-router-dom";
import { useState, useEffect } from "react";

interface Article {
    _id: string;
    title: string;
    description: string;
    content: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export default function ArticleDetail() {
    const { id } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!id) {
                setError("Invalid article ID");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/api/articles/${id}`);
                if (!response.ok) {
                    throw new Error('Article not found');
                }
                const data = await response.json();
                setArticle(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) {
        return <div className="p-8">Loading article...</div>;
    }

    if (error || !article) {
        return <div className="p-8 text-red-500">Error: {error || 'Article not found'}</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-4xl font-semibold">{article.title}</h1>
            <img
                src={article.image}
                alt={article.title}
                className="mt-4 w-full h-96 object-cover"
            />
            <p className="mt-4 text-lg text-gray-300">{article.description}</p>
            <div className="mt-6 text-gray-200 whitespace-pre-wrap">
                {article.content}
            </div>
            <p className="mt-4 text-sm text-gray-500">
                Published on: {new Date(article.createdAt).toLocaleDateString()}
            </p>
        </div>
    );
}