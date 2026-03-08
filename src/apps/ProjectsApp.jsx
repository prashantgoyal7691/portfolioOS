import { useEffect, useState } from "react";

function ProjectsApp() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/prashantgoyal7691/repos")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <div className="space-y-4">

      {projects.map((repo) => (
        <div
          key={repo.id}
          className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition"
        >

          <h3 className="text-lg font-semibold">{repo.name}</h3>

          <p className="text-gray-400 text-sm">
            {repo.description || "No description"}
          </p>

          <div className="flex gap-4 mt-2 text-sm">
            <span className="text-green-400">
              {repo.language}
            </span>

            <a
              href={repo.html_url}
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              GitHub
            </a>
          </div>

        </div>
      ))}

    </div>
  );
}

export default ProjectsApp;