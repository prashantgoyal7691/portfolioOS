import { useState, useEffect, useRef } from "react";
import DesktopIcon from "./DesktopIcon";
import Draggable from "react-draggable";
import Window from "../Window/Window";
import Dock from "../Dock/Dock";
import MenuBar from "../MenuBar/MenuBar";
import MatrixBackground from "../Background/MatrixBackground";
import TerminalApp from "../../apps/TerminalApp";
import AboutApp from "../../apps/AboutApp";
import SkillsApp from "../../apps/SkillsApp";
import ProjectsApp from "../../apps/ProjectsApp";
import ContactApp from "../../apps/ContactApp";
import EducationApp from "../../apps/EducationApp";
import SongsApp from "../../apps/SongsApp";
import FeedbackApp from "../../apps/FeedbackApp";

function Desktop() {
  const [windows, setWindows] = useState([]);
  const [minimized, setMinimized] = useState([]);

  const [iconPositions, setIconPositions] = useState(() => {
    const saved = localStorage.getItem("desktop-icon-positions");
    if (saved) return JSON.parse(saved);

    return {
      projects: { x: 0, y: 0 },
      skills: { x: 0, y: 90 },
      about: { x: 0, y: 180 },
      terminal: { x: 0, y: 270 },
      resume: { x: 0, y: 360 },
      contact: { x: 0, y: 450 },
      education: { x: 0, y: 540 },
      songs: { x: 0, y: 630 },
    };
  });

  const minimizeWindow = (name) => {
    setWindows((prev) => {
      const win = prev.find((w) => w.name === name);
      if (!win) return prev;
      setMinimized((m) => [...m, win]);
      return prev.filter((w) => w.name !== name);
    });
  };

  const restoreWindow = (name) => {
    setMinimized((prev) => {
      const win = prev.find((m) => m.name === name);
      if (!win) return prev;
      setWindows((w) => [...w, win]);
      return prev.filter((m) => m.name !== name);
    });
  };
  useEffect(() => {
    const sortAsc = () => {
      setIconPositions((prev) => {
        const entries = Object.entries(prev).sort((a, b) =>
          a[0].localeCompare(b[0]),
        );

        const updated = {};
        entries.forEach(([key], index) => {
          updated[key] = { x: 0, y: index * 90 };
        });

        return updated;
      });
    };

    const sortDesc = () => {
      setIconPositions((prev) => {
        const entries = Object.entries(prev).sort((a, b) =>
          b[0].localeCompare(a[0]),
        );

        const updated = {};
        entries.forEach(([key], index) => {
          updated[key] = { x: 0, y: index * 90 };
        });

        return updated;
      });
    };

    const resetDefault = () => {
      setIconPositions({
        projects: { x: 10, y: 0 },
        skills: { x: 10, y: 90 },
        about: { x: 10, y: 180 },
        terminal: { x: 10, y: 270 },
        resume: { x: 10, y: 360 },
        contact: { x: 10, y: 450 },
        education: { x: 10, y: 540 },
        songs: { x: 10, y: 630 },
      });
    };

    window.addEventListener("icons-asc", sortAsc);
    window.addEventListener("icons-desc", sortDesc);
    window.addEventListener("icons-default", resetDefault);

    return () => {
      window.removeEventListener("icons-asc", sortAsc);
      window.removeEventListener("icons-desc", sortDesc);
      window.removeEventListener("icons-default", resetDefault);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "desktop-icon-positions",
      JSON.stringify(iconPositions),
    );
  }, [iconPositions]);

  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const aboutRef = useRef(null);
  const terminalRef = useRef(null);
  const resumeRef = useRef(null);
  const contactRef = useRef(null);
  const educationRef = useRef(null);
  const songsRef = useRef(null);

  const openWindow = (name) => {
    const alreadyOpen = windows.some((w) => w.name === name);

    if (alreadyOpen) return;

    setWindows((prev) => {
      const offset = prev.length * 30;

      return [
        ...prev,
        {
          name,
          x: 160 + offset,
          y: 120 + offset,
        },
      ];
    });
  };

  const closeWindow = (name) => {
    setWindows((prev) => prev.filter((w) => w.name !== name));
    setMinimized((prev) => prev.filter((m) => m.name !== name));
  };

  const focusWindow = (name) => {
    setWindows((prev) => {
      const target = prev.find((w) => w.name === name);
      if (!target) return prev;

      const others = prev.filter((w) => w.name !== name);

      return [...others, target];
    });
  };
  return (
    <div className="h-screen w-full bg-[#050505] relative m-0">
      <MatrixBackground />
      <div className="absolute  w-full h-full m-0 p-10">
        <Draggable
          bounds="parent"
          nodeRef={projectsRef}
          position={iconPositions.projects}
          onStop={(e, data) =>
            setIconPositions((prev) => ({
              ...prev,
              projects: { x: data.x, y: data.y },
            }))
          }
        >
          <div ref={projectsRef} className="absolute">
            <DesktopIcon
              type="folder"
              label="Projects"
              onOpen={() => openWindow("projects")}
            />
          </div>
        </Draggable>

        <Draggable
          bounds="parent"
          nodeRef={skillsRef}
          position={iconPositions.skills}
          onStop={(e, data) =>
            setIconPositions((prev) => ({
              ...prev,
              skills: { x: data.x, y: data.y },
            }))
          }
        >
          <div ref={skillsRef} className="absolute">
            <DesktopIcon
              type="folder"
              label="Skills"
              onOpen={() => openWindow("skills")}
            />
          </div>
        </Draggable>

        <Draggable
          bounds="parent"
          nodeRef={aboutRef}
          position={iconPositions.about}
          onStop={(e, data) =>
            setIconPositions((prev) => ({
              ...prev,
              about: { x: data.x, y: data.y },
            }))
          }
        >
          <div ref={aboutRef} className="absolute">
            <DesktopIcon
              type="about"
              label="About"
              onOpen={() => openWindow("about")}
            />
          </div>
        </Draggable>

        <Draggable
          bounds="parent"
          nodeRef={terminalRef}
          position={iconPositions.terminal}
          onStop={(e, data) =>
            setIconPositions((prev) => ({
              ...prev,
              terminal: { x: data.x, y: data.y },
            }))
          }
        >
          <div ref={terminalRef} className="absolute">
            <DesktopIcon
              type="terminal"
              label="Terminal"
              onOpen={() => openWindow("terminal")}
            />
          </div>
        </Draggable>

        <Draggable
          bounds="parent"
          nodeRef={resumeRef}
          position={iconPositions.resume}
          onStop={(e, data) =>
            setIconPositions((prev) => ({
              ...prev,
              resume: { x: data.x, y: data.y },
            }))
          }
        >
          <div ref={resumeRef} className="absolute">
            <DesktopIcon
              type="file"
              label="Resume"
              onOpen={() => openWindow("resume")}
            />
          </div>
        </Draggable>

        <Draggable
          bounds="parent"
          nodeRef={contactRef}
          position={iconPositions.contact}
          onStop={(e, data) =>
            setIconPositions((prev) => ({
              ...prev,
              contact: { x: data.x, y: data.y },
            }))
          }
        >
          <div ref={contactRef} className="absolute">
            <DesktopIcon
              type="contact"
              label="Contact"
              onOpen={() => openWindow("contact")}
            />
          </div>
        </Draggable>

        <Draggable
          bounds="parent"
          nodeRef={educationRef}
          position={iconPositions.education}
          onStop={(e, data) =>
            setIconPositions((prev) => ({
              ...prev,
              education: { x: data.x, y: data.y },
            }))
          }
        >
          <div ref={educationRef} className="absolute">
            <DesktopIcon
              type="Info"
              label="Education"
              onOpen={() => openWindow("education")}
            />
          </div>
        </Draggable>

        <Draggable
          bounds="parent"
          nodeRef={songsRef}
          position={iconPositions.songs}
          onStop={(e, data) =>
            setIconPositions((prev) => ({
              ...prev,
              songs: { x: data.x, y: data.y },
            }))
          }
        >
          <div ref={songsRef} className="absolute">
            <DesktopIcon
              type="songs"
              label="Songs"
              onOpen={() => openWindow("songs")}
            />
          </div>
        </Draggable>
      </div>

      {windows.map((win, index) => {
        if (win.name === "projects") {
          return (
            <Window
              key={win.name}
              title="Projects"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.name)}
              onFocus={() => focusWindow(win.name)}
              onMinimize={() => minimizeWindow(win.name)}
            >
              <ProjectsApp />
            </Window>
          );
        }

        if (win.name === "skills") {
          return (
            <Window
              key={win.name}
              title="Skills"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.name)}
              onFocus={() => focusWindow(win.name)}
              onMinimize={() => minimizeWindow(win.name)}
            >
              <SkillsApp />
            </Window>
          );
        }

        if (win.name === "terminal") {
          return (
            <Window
              key={win.name}
              title="Terminal"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.name)}
              onFocus={() => focusWindow(win.name)}
              onMinimize={() => minimizeWindow(win.name)}
            >
              <TerminalApp openWindow={openWindow} />
            </Window>
          );
        }

        if (win.name === "about") {
          return (
            <Window
              key={win.name}
              title="About Me"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.name)}
              onFocus={() => focusWindow(win.name)}
              onMinimize={() => minimizeWindow(win.name)}
            >
              <AboutApp />
            </Window>
          );
        }

        if (win.name === "resume") {
          return (
            <Window
              key={win.name}
              title="Resume"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.name)}
              onFocus={() => focusWindow(win.name)}
              onMinimize={() => minimizeWindow(win.name)}
            >
              <iframe
                src="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0"
                className="w-full h-full border-none"
                title="Resume"
              />
            </Window>
          );
        }

        if (win.name === "contact") {
          return (
            <Window
              key={win.name}
              title="Contact"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.name)}
              onFocus={() => focusWindow(win.name)}
              onMinimize={() => minimizeWindow(win.name)}
            >
              <ContactApp />
            </Window>
          );
        }

        if (win.name === "education") {
          return (
            <Window
              key={win.name}
              title="Education"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.name)}
              onFocus={() => focusWindow(win.name)}
              onMinimize={() => minimizeWindow(win.name)}
            >
              <EducationApp />
            </Window>
          );
        }

        if (win.name === "songs") {
          return (
            <Window
              key={win.name}
              title="Songs"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.name)}
              onFocus={() => focusWindow(win.name)}
              onMinimize={() => minimizeWindow(win.name)}
            >
              <SongsApp />
            </Window>
          );
        }
        if (win.name === "feedback") {
          return (
            <Window
              key={win.name}
              title="Feedback"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.name)}
              onFocus={() => focusWindow(win.name)}
              onMinimize={() => minimizeWindow(win.name)}
            >
              <FeedbackApp />
            </Window>
          );
        }

        if (win.name === "system") {
          return (
            <Window
              key={win.name}
              title="About This Portfolio"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.name)}
              onFocus={() => focusWindow(win.name)}
              onMinimize={() => minimizeWindow(win.name)}
            >
              <div className="text-gray-300 space-y-2">
                <h2 className="text-lg font-semibold text-white">
                  portfolioOS
                </h2>

                <p>Version: 1.0</p>
                <p>Developer: Prashant Goyal</p>
                <p>Stack: React + Tailwind + Vite</p>
                <p>UI: macOS Inspired Desktop Portfolio</p>
              </div>
            </Window>
          );
        }
      })}
      <Dock
        openWindow={openWindow}
        minimized={minimized}
        windows={windows}
        restoreWindow={restoreWindow}
        closeWindow={closeWindow}
        minimizeWindow={minimizeWindow}
      />
      <MenuBar openWindow={openWindow}/>
    </div>
  );
}

export default Desktop;
