import { useParams } from "react-router-dom";

const projects = [
    {
        id: 1,
        title: "Project One",
        description: "This is a detailed description of project one.",
        image: "https://via.placeholder.com/600",
    },
];

export default function ProjectDetail() {
    const { id } = useParams();

    if(!id) {
        return <div>Invalid project ID</div>;
    }
    const project = projects.find((p) => p.id === parseInt(id));

    if (!project) {
        return <div>Project not found</div>;
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
        </div>
);
}
