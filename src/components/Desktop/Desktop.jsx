import { useState, useEffect, useRef } from "react";
import DesktopIcon from "./DesktopIcon";
import Draggable from "react-draggable";
import Window from "../Window/Window";
import Dock from "../Dock/Dock";
import MenuBar from "../MenuBar/MenuBar";
import MatrixBackground from "../Background/MatrixBackground";
import TerminalApp from "../../apps/TerminalApp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import AboutApp from "../../apps/AboutApp";
import SkillsApp from "../../apps/SkillsApp";
import ProjectsApp from "../../apps/ProjectsApp";
import ContactApp from "../../apps/ContactApp";
import EducationApp from "../../apps/EducationApp";

function Desktop() {
  const [windows, setWindows] = useState([]);

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
    };
  });

  useEffect(() => {
    localStorage.setItem(
      "desktop-icon-positions",
      JSON.stringify(iconPositions)
    );
  }, [iconPositions]);

  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const aboutRef = useRef(null);
  const terminalRef = useRef(null);
  const resumeRef = useRef(null);
  const contactRef = useRef(null);
  const educationRef = useRef(null);

  const openWindow = (name) => {
    setWindows((prev) => {
      const offset = prev.length * 30;

      return [
        ...prev,
        {
          id: Date.now(),
          name,
          x: 160 + offset,
          y: 120 + offset,
        },
      ];
    });
  };

  const closeWindow = (id) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  };

  const focusWindow = (id) => {
    setWindows((prev) => {
      const target = prev.find((w) => w.id === id);
      if (!target) return prev;

      const others = prev.filter((w) => w.id !== id);

      return [...others, target];
    });
  };
  const duplicateWindow = () => {
    setWindows((prev) => {
      if (prev.length === 0) return prev;

      // last window in array = focused window
      const active = prev[prev.length - 1];

      const offset = prev.length * 30;

      return [
        ...prev,
        {
          id: Date.now(),
          name: active.name,
          x: active.x + 40,
          y: active.y + 40,
        },
      ];
    });
  };

  useEffect(() => {
    const handler = () => duplicateWindow();

    window.addEventListener("duplicate-window", handler);

    return () => {
      window.removeEventListener("duplicate-window", handler);
    };
  }, []);
  return (
    <div className="h-screen w-full bg-[#050505] relative">
      <MatrixBackground />
      <MenuBar />
      <div className="absolute top-10 left-10 w-full h-full relative">
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
              type="folder"
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
              type="folder"
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
              type="folder"
              label="Education"
              onOpen={() => openWindow("Education")}
            />
          </div>
        </Draggable>
      </div>

      {windows.map((win, index) => {
        if (win.name === "projects") {
          return (
            <Window
              key={win.id}
              title="Projects"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              <ProjectsApp />
            </Window>
          );
        }

        if (win.name === "skills") {
          return (
            <Window
              key={win.id}
              title="Skills"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              <SkillsApp />
            </Window>
          );
        }

        if (win.name === "terminal") {
          return (
            <Window
              key={win.id}
              title="Terminal"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              <TerminalApp openWindow={openWindow} />
            </Window>
          );
        }

        if (win.name === "about") {
          return (
            <Window
              key={win.id}
              title="About Me"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              <AboutApp />
            </Window>
          );
        }

        if (win.name === "resume") {
          return (
            <Window
              key={win.id}
              title="Resume"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
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
              key={win.id}
              title="Contact"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              <ContactApp />
            </Window>
          );
        }

        if (win.name === "Education") {
          return (
            <Window
              key={win.id}
              title="Education"
              x={win.x}
              y={win.y}
              isFocused={index === windows.length - 1}
              onClose={() => closeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              <EducationApp />
            </Window>
          );
        }
      })}
      <Dock openWindow={openWindow} />
    </div>
  );
}

export default Desktop;
