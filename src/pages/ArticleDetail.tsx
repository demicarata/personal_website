import {useParams} from "react-router-dom";

const articles = [
    {
        id: 1,
        title: "My first blog post",
        createdAt: "2021-01-01",
        content: "This is my first blog post. I'm so excited to share my thoughts with you.",
        image: '/assets/garf.jpg',
        description: "This is a description of my first blog post.",
    }
];
export default function ArticleDetail() {
    const { id } = useParams();

    if (!id) {
        return <div>Invalid article ID</div>;
    }

    const article = articles.find((a) => a.id === parseInt(id));

    if (!article) {
        return <div>Article not found</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-4xl font-semibold">{article.title}</h1>
            <img
                src={article.image}
                alt={article.title}
                className="mt-4 w-full h-96 object-cover"
            />
            <p className="mt-4 text-lg">{article.description}</p>
        </div>
    );
}