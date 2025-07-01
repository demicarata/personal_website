import {Link} from "react-router-dom";

const articles = [
    {
        id: 1,
        title: "My first blog post",
        createdAt: "2021-01-01",
        content: "This is my first blog post. I'm so excited to share my thoughts with you.",
        image: "https://via.placeholder.com/600",
        description: "This is a description of my first blog post.",
    }
];

export default function Blog() {
    return (
        <div>
            <h1 className="text-4xl font-semibold">Blog</h1>
            <p>Here you can find some of the things I wrote.</p>
            <h1>Write-ups</h1>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {articles.map((article) => (
                    <Link
                        to={`/project/${article.id}`}
                        key={article.id}
                        className="border p-4 shadow-lg hover:border-amber-500 transition duration-100"
                    >
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-48 object-cover"
                        />
                        <h2 className="text-xl font-semibold mt-4">{article.title}</h2>
                        <p className="text-gray-400">{article.description}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Added on: {article.createdAt}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}