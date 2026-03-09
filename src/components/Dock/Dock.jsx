import { useState, useEffect } from "react";
import DockIcon from "./DockIcon";
import { FaFolder, FaTerminal, FaFileAlt, FaUser } from "react-icons/fa";

function Dock({ openWindow, minimized, restoreWindow, windows, closeWindow }) {
  const [showDock, setShowDock] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null);
  const runningApps = [...windows, ...minimized];
  const [openingApps, setOpeningApps] = useState([]);
  const [dockMenu, setDockMenu] = useState(null);

  const handleIconClick = (name, action) => {
    setActiveIcon(name);

    const minimizedWindow = minimized?.find((m) => m.name === name);
    const alreadyOpen = windows?.some((w) => w.name === name);
    if (openingApps.includes(name)) return;
    if (minimizedWindow) {
      // restore instantly from dock
      restoreWindow(minimizedWindow.name);
      setTimeout(() => setActiveIcon(null), 400);
      return;
    }
    if (alreadyOpen) {
      // do nothing if already open
      setTimeout(() => setActiveIcon(null), 400);
      return;
    }

    setOpeningApps((prev) => [...prev, name]);
    // normal open with delay animation
    setTimeout(() => {
      action();
      setOpeningApps((prev) => prev.filter((app) => app !== name));
    }, 1000);

    setTimeout(() => {
      setActiveIcon(null);
    }, 1000);
  };

  useEffect(() => {
    const closeMenu = () => setDockMenu(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);

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
        onMouseLeave={() => {
          if (!dockMenu) {
            setShowDock(false);
          }
        }}
      >
        <div
          className={`flex flex-col items-center transition-transform duration-200 hover:scale-125 ${activeIcon === "projects" ? "animate-bounce" : ""}`}
        >
          <DockIcon
            icon={<FaFolder size={24} />}
            label="Projects"
            hideLabel={dockMenu !== null}
            onClick={() =>
              handleIconClick("projects", () => openWindow("projects"))
            }
            onContextMenu={(e) => {
              e.preventDefault();
              setDockMenu({
                name: "projects",
                x: e.clientX,
                y: e.clientY,
              });
            }}
          />
          {((minimized?.some((m) => m.name === "projects")) ||
            (windows?.some((m) => m.name === "projects"))) && (
              <div className="w-1.5 h-1.5 mt-1 rounded-full bg-white/80"></div>
            )}
        </div>

        <div
          className={`flex flex-col items-center transition-transform duration-200 hover:scale-125 ${activeIcon === "terminal" ? "animate-bounce" : ""}`}
        >
          <DockIcon
            icon={<FaTerminal size={24} />}
            label="Terminal"
            hideLabel={dockMenu !== null}
            onClick={() =>
              handleIconClick("terminal", () => openWindow("terminal"))
            }
            onContextMenu={(e) => {
              e.preventDefault();
              setShowDock(true);
              setDockMenu({
                name: "terminal",
                x: e.clientX,
                y: e.clientY,
              });
            }}
          />
          {((minimized?.some((m) => m.name === "terminal")) ||
            (windows?.some((m) => m.name === "terminal"))) && (
              <div className="w-1.5 h-1.5 mt-1 rounded-full bg-white/80"></div>
            )}
        </div>

        <div
          className={`flex flex-col items-center transition-transform duration-200 hover:scale-125 ${activeIcon === "about" ? "animate-bounce" : ""}`}
        >
          <DockIcon
            icon={<FaUser size={24} />}
            label="About"
            hideLabel={dockMenu !== null}
            onClick={() => handleIconClick("about", () => openWindow("about"))}
            onContextMenu={(e) => {
              e.preventDefault();
              setDockMenu({
                name: "about",
                x: e.clientX,
                y: e.clientY,
              });
            }}
          />
          {((minimized?.some((m) => m.name === "about")) ||
            (windows?.some((m) => m.name === "about")) )&& (
              <div className="w-1.5 h-1.5 mt-1 rounded-full bg-white/80"></div>
            )}
        </div>
        <div
          className={`flex flex-col items-center transition-transform duration-200 hover:scale-125 ${activeIcon === "resume" ? "animate-bounce" : ""}`}
        >
          <DockIcon
            icon={<FaFileAlt size={24} />}
            label="Resume"
            hideLabel={dockMenu !== null}
            onClick={() =>
              handleIconClick("resume", () => openWindow("resume"))
            }
            onContextMenu={(e) => {
              e.preventDefault();
              setDockMenu({
                name: "resume",
                x: e.clientX,
                y: e.clientY,
              });
            }}
          />
          {((minimized?.some((m) => m.name === "resume")) ||
            (windows?.some((m) => m.name === "resume")) )&& (
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
            key={m.name}
            className={`flex flex-col items-center transition-transform duration-200 hover:scale-125 ${activeIcon === m.name ? "animate-bounce" : ""}`}
          >
            <DockIcon
              icon={<FaFolder size={24} />}
              label={m.name}
              hideLabel={dockMenu !== null}
              onClick={() =>
                handleIconClick(m.name, () => restoreWindow(m.name))
              }
              onContextMenu={(e) => {
                e.preventDefault();
                setDockMenu({
                  name: m.name,
                  x: e.clientX,
                  y: e.clientY,
                });
              }}
            />

            <div className="w-1.5 h-1.5 mt-1 rounded-full bg-white/80"></div>
          </div>
        ))}
      </div>
      {dockMenu && (
        <div
          style={{
            position: "fixed",
            top: dockMenu.y - 110,
            left: dockMenu.x-30,
          }}
          className="bg-black/40 border border-white/10 rounded-md text-sm w-32 z-50"
        >
          <div
            className="px-3 py-2 hover:bg-blue-500/30 cursor-pointer text-grey-400"
            onClick={() => {
              const name = dockMenu.name;

              const minimizedWindow = minimized.find((m) => m.name === name);
              const openWindowExists = windows.find((w) => w.name === name);

              if (minimizedWindow) {
                restoreWindow(name);
              } else if (!openWindowExists) {
                openWindow(name);
              }

              setDockMenu(null);
            }}
          >
            Open
          </div>

          <div
            className="px-3 py-2 hover:bg-blue-500/30 cursor-pointer text-grey-400"
            onClick={() => {
              const name = dockMenu.name;

              // close window
              closeWindow(name);

              setDockMenu(null);
            }}
          >
            Quit
          </div>
        </div>
      )}
    </>
  );
}

export default Dock;
