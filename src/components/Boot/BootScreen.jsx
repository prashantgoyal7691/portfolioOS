import { useState } from "react";

function BootScreen({ onFinish }) {

  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "PrashantOS v1.0",
    "Type 'boot' or 'start' to launch the desktop"
  ]);

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {

      const command = input.trim().toLowerCase();

      if (command === "boot" || command === "start") {

        setHistory(prev => [...prev, `> ${input}`, "Launching Desktop..."]);

        setTimeout(() => {
          onFinish();
        }, 1000);

      } else {

        setHistory(prev => [
          ...prev,
          `> ${input}`,
          "Command not found. Try 'boot'"
        ]);

      }

      setInput("");
    }
  };

  return (
    <div className="h-screen w-full bg-black text-green-400 font-mono p-10 text-lg">

      {history.map((line, i) => (
        <p key={i}>{line}</p>
      ))}

      <div className="flex mt-2">
        <span className="mr-2">{">"}</span>

        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none text-green-400 w-full"
        />
      </div>

    </div>
  );
}

export default BootScreen;