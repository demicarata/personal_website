import { Link } from "react-router-dom";

const projects = [
    {
        id: 1,
        title: "Project One",
        description: "This is a description of project one.",
        image: "./assets/garf.jpg", 
        createdAt: "2021-09-01",
    },
];

export default function Projects() {
    return (
        <div>
            <h1 className="text-4xl font-semibold">Projects</h1>
            <p> Some projects that I worked on and took the time to document. </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {projects.map((project) => (
                    <Link
                        to={`/project/${project.id}`}
                        key={project.id}
                        className="border p-4 shadow-lg hover:border-amber-400 transition duration-100"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-48 object-cover rounded-md"
                        />
                        <h2 className="text-xl font-semibold mt-4">{project.title}</h2>
                        <p className="text-gray-400">{project.description}</p>
                        <p className="text-sm text-gray-500 mt-2">
                            Added on: {project.createdAt}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}