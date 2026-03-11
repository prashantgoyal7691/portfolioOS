function ProjectsApp() {
  const githuburl = "https://github.com/prashantgoyal7691/";

  let arr2 = [
    {
      uri: "task-management-app",
      desc: "A productivity web application for organizing tasks, setting priorities, and tracking progress efficiently.",
      view: "https://task-management-app-fae5c.web.app/",
    },

    {
      uri: "stealth-escape",
      desc: "A browser-based stealth puzzle game where players navigate obstacles and escape levels using strategy and timing.",
      view: "https://stealth-escape.netlify.app/",
    },

    {
      uri: "portfolioOS",
      desc: "An operating-system styled developer portfolio with interactive windows, dock, and app-like navigation.",
      view: "https://portfolioospg.netlify.app/",
    },

    {
      uri: "Kota-Metro-Planner",
      desc: "A metro route planning tool that helps users find optimal paths, stations, and travel information for Kota Metro.",
      view: "https://cerulean-lily-2a57ca.netlify.app/",
    },

    {
      uri: "Dr-Br-Ambedkar-Main",
      desc: "An informational website dedicated to Dr. B. R. Ambedkar showcasing his life, contributions, and legacy.",
      view: "https://ambedkar-rag-backend.vercel.app/",
    },

    {
      uri: "Ludo-Dice-Game",
      desc: "A digital implementation of the classic Ludo board game with dice mechanics and interactive gameplay.",
      view: "https://ludodice-game.netlify.app/",
    },
  ];

  return (
    <div className="space-y-6">
      {arr2.map((repo) => (
        <div
          key={repo.uri}
          className="p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition"
        >
          <h3 className="text-lg font-semibold flex items-center gap-2">
            📁 {repo.uri.replaceAll("-", " ")}
          </h3>

          <p className="text-gray-400 text-sm">
            {`${repo.desc}` || "No description"}
          </p>

          <div className="flex gap-4 mt-2 text-sm">
            {/* <span className="text-green-400">
              {repo}
            </span> */}

            <a
              href={`${githuburl}${repo.uri}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              GitHub
            </a>
            <a
              href={`${repo.view}`}
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              View
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsApp;
