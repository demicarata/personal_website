export default function Contact() {
    return (
        <div>
            <h1 className="text-4xl font-semibold">Contact</h1>
            <p className="mt-4">
                Should you ever need to bother me, here are some ways to do so.
            </p>
            <div className="mt-4 space-x-4 ">
                GitHub:   
                <span className="ml-2">
                    <a
                        href="https://github.com/demicarata"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 underline hover:text-amber-600"
                    >
                        demicarata
                    </a>
                </span>
                Linkedin:   
                <span className="ml-2">
                    <a
                        href="https://www.linkedin.com/in/demetra-carata-dejoianu-b0167523b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 underline hover:text-amber-600"
                    >
                        Demetra Carata-Dejoianu
                    </a>
                </span>
            </div>
            <div>
                <p className = "mt-4">
                    E-mail: 
                    <span className="ml-2">
                        <a
                            href="mailto: dcarata@protonmail.com"
                            className="text-amber-400 underline hover:text-amber-600"
                        >       
                        dcarata@protonmail.com
                        </a>
                        <a href="public_key.asc" download="public_key.asc" className="ml-2 text-amber-400 underline hover:text-amber-600">
                            [PGP]
                        </a>
                    </span>
                </p>
            </div>
        </div>
    )
}