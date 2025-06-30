import {BrowserRouter as Router, Routes, Route, Link, useLocation} from "react-router-dom";
import About from "../../portfolio-1/src/pages/About.tsx";
import Projects from "../../portfolio-1/src/pages/Projects";
import Blog from "../../portfolio-1/src/pages/Blog";
import Contact from "../../portfolio-1/src/pages/Contact";
import ProjectDetail from "./pages/ProjectDetail.tsx";

interface NavLinkProps {
    to: string;
    label: string;
}


function NavLink({ to, label }: NavLinkProps) {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`flex items-center gap-2 transition-all font-semibold ${
                isActive ? "text-amber-50" : "text-amber-200"
            }`}
        >
            <span
                className={`transition-all ${
                    isActive ? "w-6" : "w-3"
                } overflow-hidden`}
            >
                {isActive ? "→→→" : "→"}
            </span>
            <span>{label}</span>
        </Link>
    );
}

export default function App() {
    return (
        <Router>
            <div className="min-h-screen bg-indigo-950 text-amber-100 relative">
                <nav className="w-60 h-screen p-4 bg-indigo-950 shadow-md flex flex-col gap-4 fixed top-32 left-16">
                    <NavLink to="/" label="About" />
                    <NavLink to="/projects" label="Projects" />
                    <NavLink to="/blog" label="Blog" />
                    <NavLink to="/contact" label="Contact" />
                </nav>

                <div className="ml-60 p-16 flex-1">
                    <Routes>
                        <Route path="/" element={<About />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/project/:id" element={<ProjectDetail />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

