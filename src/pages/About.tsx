import { GraduationCap, BookOpen, School } from "lucide-react";

const cvItems = [
    {
        icon: <School className="text-amber-300 w-6 h-6" />,
        title: "M.Sc. in ___",
        institution: "University of ---",
        year: "2025 - ???",
    },
    {
        icon: <BookOpen className="text-amber-300 w-6 h-6" />,
        title: "B.Sc. in Computer Science and Engineering",
        institution: "Delft Technological University",
        year: "2021 – 2025",
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
            <p className="mt-4">
               Hi, I'm Demi. I'm a Computer Science and Engineering student at TU Delft. I'm passionate about cybersecurity.
            </p>

            <p className="mt-4 font-semibold">
                Education
            </p>

            <div className="relative pl-10">
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