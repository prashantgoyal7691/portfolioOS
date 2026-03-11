import { useState, useRef, useEffect } from "react";

const fileSystem = {
  "/": {
    type: "dir",
    children: {
      about: {
        type: "file",
        content: "Prashant Goyal\nCSE Student\nMERN + DSA enthusiast.",
      },
      projects: {
        type: "dir",
        children: {
          "url-shortener.txt": {
            type: "file",
            content: "URL Shortener built with Node.js and MongoDB.",
          },
          "portfolio-os.txt": {
            type: "file",
            content: "This OS-style portfolio built with React.",
          },
        },
      },
      skills: {
        type: "file",
        content: "C++\nJavaScript\nReact\nNode.js\nMongoDB\nDSA",
      },
      contact: {
        type: "file",
        content: `Email: prashantgo7691@gmail.com
LinkedIn: www.linkedin.com/in/prashantgoyal7691
GitHub: github.com/prashantgoyal7691
Instagram: www.instagram.com/prashant_goyal19`,
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
    for (let part of parts) node = node.children[part];
    return node;
  };

  const runCommand = (command) => {
    // Python mode interpreter
    if (mode === "python") {
      let output = "";

      if (command.trim() === "exit()" || command.trim() === "exit") {
        setMode("shell");
        setHistory((prev) => [...prev, `>>> ${command}`, "Exiting Python shell..."]);
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
            context[name] !== undefined ? JSON.stringify(context[name]) : name
          );
          const result = eval(evaluatedExpr);
          output = result;
        } else {
          const context = { ...pythonVars };
          const result = eval(
            command.replace(/\b[a-zA-Z_]\w*\b/g, (name) =>
              context[name] !== undefined ? context[name] : name
            )
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
    const cmd = parts[0];
    const arg = parts[1];

    let output = "";

    switch (cmd) {
      case "help":
        output = `Commands:
help
ls
cd
pwd
cat
clear
python`;
        break;

      case "ls":
        const dir = getCurrentDir();
        output = Object.keys(dir.children).join("   ");
        break;

      case "pwd":
        output = cwd;
        break;

      case "cd":
        if (!arg) {
          output = "Usage: cd <folder>";
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
        const node = getCurrentDir().children[arg];
        if (node && node.type === "file") {
          output = node.content;
        } else {
          output = "File not found";
        }
        break;

      case "clear":
        setHistory([]);
        return;

      case "open":
        if (arg === "resume") {
          output = "opening resume window...";
          openWindow("resume");
          break;
        } else if (arg === "contact") {
          output = "opening contact window...";
          openWindow("contact");
          break;
        } else if (arg === "skills") {
          output = "opening skills window...";
          openWindow("skills");
          break;
        } else if (arg === "about") {
          output = "opening about window...";
          openWindow("about");
          break;
        } else if (arg === "project") {
          output = "opening project window...";
          openWindow("project");
          break;
        }else {
          output = "Permission denied.";
        }
        break;

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
        output = "Command not found. Type 'help'.";
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
