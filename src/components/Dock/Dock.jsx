import { useState, useEffect } from "react";
import DockIcon from "./DockIcon";
import { FaFolder, FaTerminal, FaFileAlt, FaUser } from "react-icons/fa";

function Dock({ openWindow, minimized, restoreWindow, windows }) {
  const [showDock, setShowDock] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const runningApps = [...windows, ...minimized];

  const handleIconClick = (name, action) => {
    setActiveIcon(name);

    const minimizedWindow = minimized?.find((m) => m.name === name);
    const alreadyOpen = windows?.some((w) => w.name === name);
    if (minimizedWindow) {
      // restore instantly from dock
      restoreWindow(minimizedWindow.id);
      setTimeout(() => setActiveIcon(null), 600);
      return;
    }
    if (alreadyOpen) {
      // do nothing if already open
      setTimeout(() => setActiveIcon(null), 600);
      return;
    }
    // normal open with delay animation
    setTimeout(() => {
      action();
    }, 2000);

    setTimeout(() => {
      setActiveIcon(null);
    }, 2000);
  };

  return (
    <>
      {/* invisible hover zone at the bottom of the screen */}
      <div
        className="fixed bottom-0 left-0 w-full h-8 z-40"
        onMouseEnter={() => setShowDock(true)}
      />

      <div
        className={`fixed left-1/2 -translate-x-1/2 flex gap-6 bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 transition-all duration-300 z-50
        ${showDock ? "bottom-6 opacity-100" : "-bottom-24 opacity-0"}`}
        onMouseLeave={() => setShowDock(false)}
      >
        <div
          className={`flex flex-col items-center transition-transform duration-200 hover:scale-125 ${activeIcon === "projects" ? "animate-bounce" : ""}`}
        >
          <DockIcon
            icon={<FaFolder size={24} />}
            label="Projects"
            onClick={() =>
              handleIconClick("projects", () => openWindow("projects"))
            }
          />
          {minimized?.some((m) => m.name === "projects") && (
            <div className="w-1.5 h-1.5 mt-1 rounded-full bg-white/80"></div>
          )}
        </div>

        <div
          className={`flex flex-col items-center transition-transform duration-200 hover:scale-125 ${activeIcon === "terminal" ? "animate-bounce" : ""}`}
        >
          <DockIcon
            icon={<FaTerminal size={24} />}
            label="Terminal"
            onClick={() =>
              handleIconClick("terminal", () => openWindow("terminal"))
            }
          />
          {minimized?.some((m) => m.name === "terminal") && (
            <div className="w-1.5 h-1.5 mt-1 rounded-full bg-white/80"></div>
          )}
        </div>

        <div
          className={`flex flex-col items-center transition-transform duration-200 hover:scale-125 ${activeIcon === "about" ? "animate-bounce" : ""}`}
        >
          <DockIcon
            icon={<FaUser size={24} />}
            label="About"
            onClick={() => handleIconClick("about", () => openWindow("about"))}
          />
          {minimized?.some((m) => m.name === "about") && (
            <div className="w-1.5 h-1.5 mt-1 rounded-full bg-white/80"></div>
          )}
        </div>

        <div
          className={`flex flex-col items-center transition-transform duration-200 hover:scale-125 ${activeIcon === "resume" ? "animate-bounce" : ""}`}
        >
          <DockIcon
            icon={<FaFileAlt size={24} />}
            label="Resume"
            onClick={() =>
              handleIconClick("resume", () => openWindow("resume"))
            }
          />
          {minimized?.some((m) => m.name === "resume") && (
            <div className="w-1.5 h-1.5 mt-1 rounded-full bg-white/80"></div>
          )}
        </div>

        {[
          ...new Map(
            runningApps
              ?.filter(
                (m) =>
                  !["projects", "terminal", "about", "resume"].includes(m.name),
              )
              .map((m) => [m.name, m]),
          ).values(),
        ].map((m) => (
          <div
            key={m.id}
            className={`flex flex-col items-center transition-transform duration-200 hover:scale-125 ${
              activeIcon === m.name ? "animate-bounce" : ""
            }`}
          >
            <DockIcon
              icon={<FaFolder size={24} />}
              label={m.name}
              onClick={() => handleIconClick(m.name, () => restoreWindow(m.id))}
            />

            <div className="w-1.5 h-1.5 mt-1 rounded-full bg-white/80"></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Dock;
