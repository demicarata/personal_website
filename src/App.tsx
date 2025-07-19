import {BrowserRouter as Router, Routes, Route, Link, useLocation} from "react-router-dom";
import About from "./pages/About.tsx";
import Projects from "./pages/Projects.tsx";
import Blog from "./pages/Blog.tsx";
import Contact from "./pages/Contact.tsx";
import ProjectDetail from "./pages/ProjectDetail.tsx";
import ArticleDetail from "./pages/ArticleDetail.tsx";
import Resources from "./pages/Resources.tsx";
import Admin from "./pages/Admin.tsx";

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
                <nav className="w-60 h-screen p-4 bg-indigo-950 flex flex-col gap-4 fixed top-32 left-16">
                    <NavLink to="/" label="About" />
                    <NavLink to="/projects" label="Projects" />
                    <NavLink to="/blog" label="Blog" />
                    <NavLink to="/resources" label="Resources" />
                    <NavLink to="/contact" label="Contact" />
                </nav>

                <div className="ml-60 p-16 flex-1">
                    <Routes>
                        <Route path="/" element={<About />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/project/:id" element={<ProjectDetail />} />
                        <Route path="/article/:id" element={<ArticleDetail />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

