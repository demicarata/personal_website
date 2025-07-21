import { useState } from "react";

interface ContentForm {
    title: string;
    description: string;
    content: string;
    image: string;
}

interface ResourceForm {
    title: string;
    link: string;
    type: 'article' | 'video' | 'book';
}

type ContentType = 'article' | 'project' | 'resource';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    
    const [contentType, setContentType] = useState<ContentType>('article');
    const [formData, setFormData] = useState<ContentForm>({
        title: "",
        description: "",
        content: "",
        image: ""
    });
    const [resourceData, setResourceData] = useState<ResourceForm>({
        title: "",
        link: "",
        type: "article"
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setAuthError("");
        } else {
            setAuthError("Invalid password");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (contentType === 'resource') {
            setResourceData(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleContentTypeChange = (type: ContentType) => {
        setContentType(type);
        setMessage(null);
        // Reset forms when switching types
        setFormData({
            title: "",
            description: "",
            content: "",
            image: ""
        });
        setResourceData({
            title: "",
            link: "",
            type: "article"
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage(null);

        try {
            let endpoint = '';
            let submitData = {};

            if (contentType === 'resource') {
                endpoint = '/api/resources';
                submitData = resourceData;
            } else {
                endpoint = contentType === 'article' ? '/api/articles' : '/api/projects';
                submitData = formData;
            }

            const response = await fetch(`http://localhost:4000${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData)
            });

            if (!response.ok) {
                throw new Error(`Failed to create ${contentType}`);
            }

            const newContent = await response.json();
            setMessage({ text: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} "${newContent.title}" created successfully!`, type: 'success' });
            
            // Reset forms
            setFormData({
                title: "",
                description: "",
                content: "",
                image: ""
            });
            setResourceData({
                title: "",
                link: "",
                type: "article"
            });
        } catch (error) {
            setMessage({ 
                text: error instanceof Error ? error.message : 'An error occurred', 
                type: 'error' 
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // If not authenticated, show login form
    if (!isAuthenticated) {
        return (
            <div className="max-w-md mx-auto mt-20">
                <div className="bg-amber-50 p-8">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-950">Admin Login</h1>
                    
                    {authError && (
                        <div className="mb-4 p-3 bg-red-600 text-red-100">
                            {authError}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium mb-2 text-indigo-900">
                                Get outta here
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-3 py-2 bg-zinc-600 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-100"
                                placeholder="Enter admin password"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold transition-colors"
                        >
                            Login
                        </button>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="text-zinc-500 hover:text-indigo-900 transition-colors"
                        >
                            ← Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Main admin panel (shown after authentication)
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-semibold">Admin Panel</h1>
                <button
                    onClick={() => {
                        setIsAuthenticated(false);
                        setPassword("");
                    }}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                    Logout
                </button>
            </div>
            
            {/* Content Type Selector */}
            <div className="mb-8">
                <div className="flex space-x-4 bg-gray-800 rounded-lg p-1">
                    <button
                        onClick={() => handleContentTypeChange('article')}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                            contentType === 'article'
                                ? 'bg-amber-600 text-white'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Add Article
                    </button>
                    <button
                        onClick={() => handleContentTypeChange('project')}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                            contentType === 'project'
                                ? 'bg-amber-600 text-white'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Add Project
                    </button>
                    <button
                        onClick={() => handleContentTypeChange('resource')}
                        className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                            contentType === 'resource'
                                ? 'bg-amber-600 text-white'
                                : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        Add Resource
                    </button>
                </div>
            </div>

            <div className="bg-gray-800 p-6">
                <h2 className="text-2xl font-semibold mb-6">
                    Add New {contentType.charAt(0).toUpperCase() + contentType.slice(1)}
                </h2>
                
                {message && (
                    <div className={`mb-4 p-3 rounded ${
                        message.type === 'success' 
                            ? 'bg-green-600 text-green-100' 
                            : 'bg-red-600 text-red-100'
                    }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={contentType === 'resource' ? resourceData.title : formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                            placeholder={`Enter ${contentType} title`}
                        />
                    </div>

                    {contentType === 'resource' ? (
                        <>
                            <div>
                                <label htmlFor="link" className="block text-sm font-medium mb-2">
                                    Link
                                </label>
                                <input
                                    type="url"
                                    id="link"
                                    name="link"
                                    value={resourceData.link}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                                    placeholder="https://example.com/resource"
                                />
                            </div>
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium mb-2">
                                    Resource Type
                                </label>
                                <select
                                    id="type"
                                    name="type"
                                    value={resourceData.type}
                                    onChange={(e) => setResourceData(prev => ({ ...prev, type: e.target.value as 'article' | 'video' | 'book' }))}
                                    required
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                                >
                                    <option value="article">Article</option>
                                    <option value="video">Video</option>
                                    <option value="book">Book</option>
                                </select>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium mb-2">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={3}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white resize-vertical"
                                    placeholder={`Enter ${contentType} description`}
                                />
                            </div>

                            <div>
                                <label htmlFor="image" className="block text-sm font-medium mb-2">
                                    Image URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    id="image"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div>
                                <label htmlFor="content" className="block text-sm font-medium mb-2">
                                    Content
                                </label>
                                <textarea
                                    id="content"
                                    name="content"
                                    value={formData.content}
                                    onChange={handleInputChange}
                                    required
                                    rows={15}
                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white resize-vertical"
                                    placeholder={`Enter the full ${contentType} content.`}
                                />
                            </div>
                        </>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 rounded-md font-semibold transition-colors ${
                                isSubmitting
                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                            }`}
                        >
                            {isSubmitting ? `Creating ${contentType}...` : `Create ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
