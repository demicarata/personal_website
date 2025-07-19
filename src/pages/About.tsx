import { GraduationCap} from "lucide-react";
import { BsCpuFill, BsEthernet } from "react-icons/bs";
import { IoNewspaper } from "react-icons/io5";

const cvItems = [
    {
        icon: <BsEthernet className="text-amber-300 w-6 h-6" />,
        title: "M.Sc. in Security and Network Engineering",
        institution: "University of Amsterdam",
        year: "2025 - 2026",
    },
    {
        icon: <IoNewspaper className="text-amber-300 w-6 h-6" />,
        title: "Minor in Journalism and New Media",
        institution: "University of Leiden",
        year: "September 2023 - January 2024",
    },
    {
        icon: <BsCpuFill className="text-amber-300 w-6 h-6" />,
        title: "B.Sc. in Computer Science and Engineering",
        institution: "Delft University of Technology",
        year: "2021 – 2025, Systems Track",
    },
    {
        icon: <GraduationCap className="text-amber-300 w-6 h-6" />,
        title: "High School Diploma",
        institution: "\"Tudor Vianu\" National College of Computer Science",
        year: "2017 - 2021",
    },
];

export default function About() {
    return (
        <div className="object-center">
            <h1 className="text-4xl font-semibold">About</h1>
            <p className="mt-8">
               Hi, I'm Demi, a Security and Network Engineering student in Amsterdam. When it comes to technology, my interests include computer forensics, network security, OSINT and open source technologies. In my free time I am also an avid reader, a guitar and bass player and a basketball enjoyer. 
            </p>

            <p className="mt-4">
                This website is a project in which I try to structure my work and ideas in a way that potentially is understandable by others.
            </p>
            <h2 className="text-2xl mt-8 font-semibold">
                Experience
            </h2>
            <ul className="list-disc ml-6 mt-2">
                <li className="text-gray-300">
                    Unemployed @ NOT A JOB (birth - 4ever)
                </li>
            </ul>

            <h2 className="text-2xl mt-8 font-semibold">
                Education
            </h2>

            <div className="relative pl-10 mt-4">
                {/* vertical line */}
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-amber-400" />
                {cvItems.map((item, index) => (
                    <div key={index} className="relative mb-8 flex items-start gap-4">
                        <div className="relative z-10 bg-indigo-900 rounded-full p-1">
                            {item.icon}
                        </div>
                        <div>
                            <h4 className="text-amber-100 font-bold text-lg">{item.title}</h4>
                            <p className="text-amber-200">{item.institution}</p>
                            <p className="text-amber-400 text-sm">{item.year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}