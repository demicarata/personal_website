import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeHighlight from 'rehype-highlight';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/github-dark.css';
import 'katex/dist/katex.min.css';

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
            <p className="mt-4 text-lg text-gray-500">{project.description}</p>
            <p className="mt-4 text-sm text-gray-500">
                Published on: {new Date(project.createdAt).toLocaleDateString('en-GB')}
            </p>
            <hr className="my-6 border-gray-500" />
            <article className="mt-6 prose prose-invert prose-lg max-w-none">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeHighlight, rehypeKatex, rehypeRaw]}
                    components={{
                        h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-amber-100">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-4 text-amber-200">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-medium mt-4 mb-3 text-amber-300">{children}</h3>,
                        p: ({ children }) => <p className="mb-4 text-gray-200 leading-relaxed">{children}</p>,
                        code: ({ inline, children, ...props }: any) => 
                            inline ? (
                                <code className="bg-gray-800 text-amber-400 px-2 py-1 rounded text-sm" {...props}>
                                    {children}
                                </code>
                            ) : (
                                <code className="block bg-gray-900 text-purple-400 p-4 rounded-lg overflow-x-auto font-mono text-sm" {...props}>
                                    {children}
                                </code>
                            ),
                        pre: ({ children }) => <pre className="mb-4">{children}</pre>,
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-amber-500 pl-4 italic text-gray-300 my-6 bg-gray-800/50 py-2">
                                {children}
                            </blockquote>
                        ),
                        ul: ({ children }) => <ul className="list-disc ml-6 mb-4 text-gray-200 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal ml-6 mb-4 text-gray-200 space-y-1">{children}</ol>,
                        li: ({ children }) => <li className="leading-relaxed pl-2">{children}</li>,
                        a: ({ children, href }) => (
                            <a href={href} className="text-amber-400 hover:text-amber-300 underline transition-colors" target="_blank" rel="noopener noreferrer">
                                {children}
                            </a>
                        ),
                        strong: ({ children }) => <strong className="font-bold text-amber-200">{children}</strong>,
                        em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
                        hr: () => <hr className="border-gray-600 my-8" />,
                        table: ({ children }) => (
                            <div className="overflow-x-auto my-6">
                                <table className="min-w-full border-collapse border border-gray-600 bg-gray-800/50">
                                    {children}
                                </table>
                            </div>
                        ),
                        thead: ({ children }) => <thead className="bg-gray-700">{children}</thead>,
                        tbody: ({ children }) => <tbody>{children}</tbody>,
                        tr: ({ children }) => <tr className="border-b border-gray-600 hover:bg-gray-800/30">{children}</tr>,
                        th: ({ children }) => (
                            <th className="border border-gray-500 px-4 py-3 text-left font-semibold text-amber-200 bg-gray-700">
                                {children}
                            </th>
                        ),
                        td: ({ children }) => (
                            <td className="border border-gray-500 px-4 py-3 text-gray-200">
                                {children}
                            </td>
                        ),
                        // Math components
                        div: ({ children, className }) => {
                            if (className === 'math math-display') {
                                return <div className="text-center my-4 text-amber-100">{children}</div>;
                            }
                            return <div className={className}>{children}</div>;
                        },
                        span: ({ children, className }) => {
                            if (className === 'math math-inline') {
                                return <span className="text-amber-200">{children}</span>;
                            }
                            return <span className={className}>{children}</span>;
                        },
                    }}
                >
                    {project.content}
                </ReactMarkdown>
            </article>
        </div>
    );
}

        
