export default function Resources() {
    return (
        <div>
            <h1 className="text-4xl font-semibold">Resources</h1>
            <p> Links to a bunch of articles, videos or books that I found interesting. Related or unrelated to cybersecurity. </p>

            <div className="mt-4 space-y-4">
                <p className="mt-4 font-semibold"> Articles </p>
                <ul className="list-disc pl-6">
                    <li>
                        <a
                            href="https://cispa.de/en/research/publications/84162-cascading-spy-sheets-exploiting-the-complexity-of-modern-css-for-email-and-browser-fingerprinting"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-400 underline hover:text-amber-600"
                        >
                            Cascading Spy Sheets: Exploiting the Complexity of Modern CSS for Email and Browser Fingerprinting
                        </a>
                    </li>
                    <li>
                        <a
                            href="https://c3.unu.edu/blog/beyond-robot-txt-modern-anti-crawler-mechanisms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-400 underline hover:text-amber-600"
                        >
                            Beyond robots.txt: Modern Anti-Crawler Mechanisms
                        </a>
                    </li>
                </ul>   
            </div>
        </div>
    );
}