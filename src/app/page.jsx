function formatDurationRange(dateRangeStr) {
    const [startStr, endStr] = dateRangeStr.toLowerCase().split(" - ");
    const monthMap = {
        jan: 0,
        feb: 1,
        mar: 2,
        apr: 3,
        may: 4,
        jun: 5,
        jul: 6,
        aug: 7,
        sep: 8,
        oct: 9,
        nov: 10,
        dec: 11,
    };

    function parseDate(str) {
        if (str === "present") return new Date();
        const [monthAbbr, year] = str.split(" ");
        const month = monthMap[monthAbbr.toLowerCase()];
        return new Date(parseInt(year), month);
    }

    const start = parseDate(startStr);
    const end = parseDate(endStr);

    let months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth()) +
        1;

    const years = Math.floor(months / 12);
    const remMonths = months % 12;

    const parts = [];
    if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
    if (remMonths > 0) parts.push(`${remMonths} mo${remMonths > 1 ? "s" : ""}`);
    if (parts.length === 0) parts.push("Less than 1 mo");

    return parts.join(" ");
}

export default function HomePage() {
    const cattDateRange = "Aug 2024 - present";
    let cattDuration = formatDurationRange(cattDateRange);
    const disaDateRange = "Aug 2024 - Jul 2025";
    let disaDuration = formatDurationRange(disaDateRange);
    const arlDateRange = "May 2024 - Aug 2024";
    let arlDuration = formatDurationRange(arlDateRange);

    return (
        <div>
            <nav>
                <div className="centerNav">
                    <div className="path">
                        <span className="path-user">ainavolu</span>
                        <span className="path-separator">:</span>
                        <span className="path-dir">~</span>
                        <span className="path-symbol">$</span>
                    </div>

                    <button
                        className="menu-toggle"
                        aria-label="Toggle navigation"
                    >
                        <i className="fas fa-bars"></i>
                    </button>

                    <ul className="nav-links">
                        <li>
                            <a href="#about">About</a>
                        </li>
                        <li>
                            <a href="#projects">Projects</a>
                        </li>
                        <li>
                            <a href="#experience">Experience</a>
                        </li>
                    </ul>
                </div>
            </nav>

            <section className="landing-page">
                <h1>Abhinav Inavolu</h1>
                <div className="button-group">
                    <a
                        href="https://www.linkedin.com/in/abhinav-inavolu"
                        className="btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                    >
                        <i className="fab fa-linkedin fa-xl"></i>
                    </a>

                    <a
                        href="https://github.com/AbhinavInavolu"
                        className="btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                    >
                        <i className="fab fa-github fa-xl"></i>
                    </a>

                    <a
                        href="mailto:arinavolu@gmail.com"
                        className="btn"
                        title="Email"
                    >
                        <i className="fas fa-envelope fa-xl"></i>
                    </a>
                </div>
                <div id="scroll-indicator" className="scroll-indicator">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </section>

            <main className="content">
                <section id="about">
                    <h1 className="underline">About</h1>
                    <p>
                        I am a sophomore at the University of Maryland pursuing
                        a dual degree in Computer Science and Finance with a
                        3.88 GPA. I am interested in reverse engineering,
                        cryptography, and cybersecurity, with experience in
                        honeypot research. I am proficient in Python, Java, C,
                        and Linux, with experience in containerization and
                        machine learning.
                    </p>
                </section>

                <section id="projects">
                    <h1 className="underline">Projects</h1>
                    <div className="entry-header">
                        <h2>HunnyPot</h2>
                        <a
                            href="https://github.com/AbhinavInavolu/HUNNYPOT-Public"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                        >
                            <i className="fab fa-github"></i> View on GitHub
                        </a>
                    </div>
                    <div className="entry">
                        <p>
                            Built and deployed high-interaction honeypots in a
                            semester long research project to study how
                            attackers engage with honeypots with varying levels
                            of PII and resource allocations. Recorded and
                            analyzed over ~200 attacks per day using
                            auto-recycling honeypots built with LXC containers.
                            Developed a tool for analyzing MITM logs for
                            anomalies complemented by Netdata for monitoring
                            resource consumption.{" "}
                        </p>
                    </div>
                </section>

                <section id="experience">
                    <h1 className="underline">Experience</h1>

                    <h2 className="company-header">
                        <img
                            src="/catt_icon.jpeg"
                            alt="CATT Logo"
                            className="company-logo"
                        />
                        <div className="company-info">
                            <span className="company-name">
                                Center for Advanced Transportation Technology
                            </span>
                            <div className="company-meta">
                                <span>College Park, MD</span> ·{" "}
                                <span>{cattDuration}</span>
                            </div>
                        </div>
                    </h2>
                    <div className="entry">
                        <div className="entry-header">
                            <h3>Software Engineering Intern</h3>
                            <span className="entry-date">{cattDateRange}</span>
                        </div>
                        <p>
                            Worked on Java Spring microservices powering a REST
                            API, contributing to feature development and backend
                            integration. Updated endpoints to support new
                            functionality, converted legacy tests to use
                            Mockito, expanded test coverage, and assisted in
                            integrating additional data sources.{" "}
                        </p>
                    </div>

                    <h2 className="company-header">
                        <img
                            src="/disa_icon.jpeg"
                            alt="DISA Logo"
                            className="company-logo"
                        />
                        <div className="company-info">
                            <span className="company-name">
                                Defense Information Systems Agency (DISA)
                            </span>
                            <div className="company-meta">
                                <span>Fort Meade, MD</span> ·{" "}
                                <span>{disaDuration}</span>
                            </div>
                        </div>
                    </h2>
                    <div className="entry">
                        <div className="entry-header">
                            <h3>Computer Science Intern</h3>
                            <span className="entry-date">{disaDateRange}</span>
                        </div>
                        <p>
                            Worked on translating data loader written in Java to
                            Python, modernizing the codebase and improving
                            maintainability. Worked on developing and testing
                            PowerBI dashboard and automating update process,
                            improving data visualization and
                            maintainability.{" "}
                        </p>
                    </div>

                    <h2 className="company-header">
                        <img
                            src="/arl_icon.jpeg"
                            alt="ARL Logo"
                            className="company-logo"
                        />
                        <div className="company-info">
                            <span className="company-name">
                                US Army DEVCOM Army Research Laboratory
                            </span>
                            <div className="company-meta">
                                <span>College Park, MD</span> ·{" "}
                                <span>{arlDuration}</span>
                            </div>
                        </div>
                    </h2>
                    <div className="entry">
                        <div className="entry-header">
                            <h3>Machine Learning Intern</h3>
                            <span className="entry-date">{arlDateRange}</span>
                        </div>
                        <p>
                            Developed machine learning model trained on real
                            time transportation data collected using a
                            three-stage synchronized data collection pipeline.
                            Achieved nearly ~90% accuracy in classifying traffic
                            incidents. Optimized data collection script to
                            maintain ~95% API utilization gathering 5,000-6,000
                            images daily autonomously.{" "}
                        </p>
                    </div>
                </section>
            </main>

            <footer>
                <p>
                    © {new Date().getFullYear()} Abhinav Inavolu. All rights
                    reserved.
                </p>
                <div className="button-group">
                    <a
                        href="https://www.linkedin.com/in/abhinav-inavolu"
                        className="btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="LinkedIn"
                    >
                        <i className="fab fa-linkedin fa-xl"></i>
                    </a>

                    <a
                        href="https://github.com/AbhinavInavolu"
                        className="btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="GitHub"
                    >
                        <i className="fab fa-github fa-xl"></i>
                    </a>

                    <a
                        href="mailto:arinavolu@gmail.com"
                        className="btn"
                        title="Email"
                    >
                        <i className="fas fa-envelope fa-xl"></i>
                    </a>
                </div>
            </footer>

            <div className="theme-toggle">
                <label className="switch">
                    <input type="checkbox" id="themeSwitch" />
                    <span className="slider">
                        <span className="slider-circle">
                            <img
                                id="themeIcon"
                                src="bash.png"
                                alt="Terminal Icon"
                                className="powershell-icon"
                            />
                        </span>
                    </span>
                </label>
            </div>
        </div>
    );
}
