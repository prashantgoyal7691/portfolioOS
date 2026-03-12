import { useState, useRef, useEffect } from "react";

const fileSystem = {
  "/": {
    type: "dir",
    children: {
      "about.txt": {
        type: "file",
        content: `Prashant Goyal
Computer Science Student
NIT Srinagar

Run:
cat open-about.window`,

      },
      "open-about.window": { type: "link", target: "about" },

      "skills.txt": {
        type: "file",
        content: `Core Skills
C++
JavaScript
React
Node.js
MongoDB

Run:
cat open-skills.window`,
      },
      "open-skills.window": { type: "link", target: "skills" },

      "resume.txt": {
        type: "file",
        content: `Resume available.

Run:
cat open-resume.window`,
      },

      projects: {
        type: "dir",
        children: {
          "task-management-app.txt": {
            type: "file",
            content: "A productivity web application for organizing tasks, setting priorities, and tracking progress efficiently.",
          },
          "billing-system.txt": {
            type: "file",
            content: "Billing system application\nHandles invoice generation",
          },
          "check-all-project.txt":{
            type:"file",
            content:`run
cat see-other-projects`
          },
          "see-other-projects": { type: "link", target: "projects" },
        },
      },

      education: {
        type: "dir",
        children: {
          "education-info": {
            type: "file",
            content: `Education Overview

B.Tech — Computer Science
NIT Srinagar

For full details:
cat open-education.window`,
          },
          "open-education.window": { type: "link", target: "education" },
        },
      },

      contact: {
        type: "dir",
        children: {
          "contact-info": {
            type: "file",
            content: `Email: prashantgo7691@gmail.com
LinkedIn: linkedin.com/in/prashantgoyal7691

Run:
cat open-contact.window`,
          },
          "open-contact.window": { type: "link", target: "contact" },
        },
      },

      songs: {
        type: "dir",
        children: {
          "music-player": {
            type: "file",
            content: `PortfolioOS Music Player

Use GUI player for controls.

Run:
cat open-songs.window`,
          },
          "open-songs.window": { type: "link", target: "songs" },
        },
      },
    },
  },
};

function TerminalApp({ openWindow }) {
  const [history, setHistory] = useState([
    "Welcome to portfolioOS Terminal",
    "Type 'help' to see available commands.",
  ]);

  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cwd, setCwd] = useState("/");
  const [mode, setMode] = useState("shell"); // shell | python
  const [pythonVars, setPythonVars] = useState({});
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const handleClear = () => {
      setHistory([]);
    };

    window.addEventListener("clear-terminal", handleClear);

    return () => {
      window.removeEventListener("clear-terminal", handleClear);
    };
  }, []);

  const getCurrentDir = () => {
    const parts = cwd.split("/").filter(Boolean);
    let node = fileSystem["/"];
    for (let p of parts) node = node.children[p];
    return node;
  };

  const runCommand = (command) => {
    // Python mode interpreter
    if (mode === "python") {
      let output = "";

      if (command.trim() === "exit()" || command.trim() === "exit") {
        setMode("shell");
        setHistory((prev) => [
          ...prev,
          `>>> ${command}`,
          "Exiting Python shell...",
        ]);
        return;
      }

      try {
        // variable assignment: x = 5
        if (command.includes("=") && !command.includes("==")) {
          const [name, value] = command.split("=").map((s) => s.trim());
          const evaluated = eval(value);
          setPythonVars((prev) => ({ ...prev, [name]: evaluated }));
          setHistory((prev) => [...prev, `>>> ${command}`]);
          return;
        }

        // print()
        if (command.startsWith("print(")) {
          const expr = command.slice(6, -1);
          const context = { ...pythonVars };
          const evaluatedExpr = expr.replace(/\b[a-zA-Z_]\w*\b/g, (name) =>
            context[name] !== undefined ? JSON.stringify(context[name]) : name,
          );
          const result = eval(evaluatedExpr);
          output = result;
        } else {
          const context = { ...pythonVars };
          const result = eval(
            command.replace(/\b[a-zA-Z_]\w*\b/g, (name) =>
              context[name] !== undefined ? context[name] : name,
            ),
          );
          output = result;
        }
      } catch {
        output = "Python error";
      }

      setHistory((prev) => [...prev, `>>> ${command}`, String(output)]);
      return;
    }

    const parts = command.split(" ");
    const cmd = parts[0]?.toLowerCase();
    const arg = parts[1]?.toLowerCase();

    let output = "";

    switch (cmd) {
      case "help":
        output = `Available Commands:

help              Show available commands
ls                List files and folders
cd <folder>       Change directory
cd ..             Go to parent directory
cd /              Go to root directory
pwd               Show current directory
cat <file>        Read file or open linked window
clear             Clear terminal screen
python            Start simulated Python shell`;
        break;

      case "ls":
        const dir = getCurrentDir();
        if (!dir.children) {
          output = "Empty directory";
          break;
        }
        output = Object.entries(dir.children)
          .filter(([name, node]) => node.type !== "link")
          .map(([name, node]) =>
            node.type === "dir" ? `📁 ${name}` : `📄 ${name}`
          )
          .join("\n");
        break;

      case "pwd":
        output = cwd;
        break;

      case "cd":
        if (!arg) {
          output = "Usage: cd <folder>";
          break;
        }
        if (arg === "/") {
          setCwd("/");
          break;
        }
        const current = getCurrentDir();
        if (arg === "..") {
          const parts = cwd.split("/").filter(Boolean);
          parts.pop();
          setCwd("/" + parts.join("/"));
          break;
        }

        if (current.children[arg] && current.children[arg].type === "dir") {
          setCwd(cwd === "/" ? `/${arg}` : `${cwd}/${arg}`);
        } else {
          output = "Directory not found";
        }

        break;

      case "cat":
        if (!arg) {
          output = "Usage: cat <file>";
          break;
        }
        const node = getCurrentDir().children[arg];

        if (!node) {
          output = "File not found";
          break;
        }

        if (node.type === "file") {
          output = node.content;
        } else if (node.type === "link") {
          openWindow(node.target);
          output = `Opening ${node.target} window...`;
        } else {
          output = "Cannot cat a directory";
        }
        break;

      case "clear":
        setHistory([]);
        return;


      case "python":
        setMode("python");
        setHistory((prev) => [
          ...prev,
          "> python",
          "Python 3.11.0 (simulated)",
          "Type exit() to return to shell",
        ]);
        return;

      default:
        output = `Command not found: ${cmd}
Type 'help' to see available commands.`;
    }

    setHistory((prev) => [...prev, `> ${command}`, output]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      runCommand(input);

      setCommandHistory((prev) => [...prev, input]);
      setHistoryIndex(-1);

      setInput("");
    }

    if (e.key === "ArrowUp") {
      const index =
        historyIndex === -1 ? commandHistory.length - 1 : historyIndex - 1;

      if (index >= 0) {
        setInput(commandHistory[index]);
        setHistoryIndex(index);
      }
    }

    if (e.key === "ArrowDown") {
      const index = historyIndex + 1;

      if (index < commandHistory.length) {
        setInput(commandHistory[index]);
        setHistoryIndex(index);
      } else {
        setInput("");
        setHistoryIndex(-1);
      }
    }

    if (e.key === "Tab") {
      e.preventDefault();

      const commands = ["help", "ls", "cd", "pwd", "cat", "clear", "python"];
      const match = commands.find((c) => c.startsWith(input));

      if (match) setInput(match);
    }
  };

  return (
    <div
      onClick={() => inputRef.current && inputRef.current.focus()}
      ref={terminalRef}
      className="bg-black text-green-400 font-mono h-full flex flex-col overflow-y-auto p-4 whitespace-pre-wrap"
    >
      {history.map((line, i) => (
        <div key={i}>{line}</div>
      ))}

      <div className="flex">
        <span className="mr-2 text-green-300">
          {mode === "python" ? ">>>" : `portfolioOS:${cwd}$`}
        </span>
        <input
          ref={inputRef}
          className="bg-transparent outline-none flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}

export default TerminalApp;
