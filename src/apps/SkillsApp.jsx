import { useState, useEffect } from "react";
import TypingText from "../components/ui/TypingText";
function SkillsApp() {
  const sections = [
    { type: "title", text: "Skills", speed: 20 },

    { type: "subtitle", text: "Programming", speed: 20 },
    { type: "item", text: "C/C++", speed: 15 },
    { type: "item", text: "JavaScript", speed: 15 },
    { type: "item", text: "Python (basic)", speed: 15 },
    { type: "item", text: "Java (learning)", speed: 15 },

    { type: "subtitle", text: "Web Development", speed: 20 },
    { type: "item", text: "HTML / CSS / JS", speed: 15 },
    { type: "item", text: "React", speed: 15 },
    { type: "item", text: "Node.js", speed: 15 },
    { type: "item", text: "Express", speed: 15 },
    { type: "item", text: "MongoDB", speed: 15 },
    { type: "item", text: "Tailwind CSS", speed: 15 },

    { type: "subtitle", text: "Core Computer Science", speed: 20 },
    { type: "item", text: "Data Structures & Algorithms", speed: 15 },
    { type: "item", text: "Object-Oriented Programming", speed: 15 },
    { type: "item", text: "Database Management Systems", speed: 15 },
    { type: "item", text: "Operating Systems", speed: 15 },
    { type: "item", text: "Computer Networks (learning)", speed: 15 },

    { type: "subtitle", text: "Tools", speed: 20 },
    { type: "item", text: "Git & GitHub", speed: 15 },
    { type: "item", text: "VS Code", speed: 15 },
    { type: "item", text: "Linux / Terminal", speed: 15 },
  ]

  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    if (visibleCount >= sections.length) return;

    const current = sections[visibleCount - 1];
    const duration = current.text.length * current.speed;

    const timer = setTimeout(() => {
      setVisibleCount((v) => v + 1);
    }, duration + 200);

    return () => clearTimeout(timer);
  }, [visibleCount]);

  return (
    <div className="p-6 text-white space-y-4">
      {sections.slice(0, visibleCount).map((section, index) => {

        if (section.type === "title") {
          return (
            <h2 key={index} className="text-2xl font-semibold text-blue-600">
              <TypingText text={section.text} speed={section.speed} />
            </h2>
          );
        }

        if (section.type === "subtitle") {
          return (
            <h3 key={index} className="text-lg font-semibold text-blue-400 pt-2">
              <TypingText text={section.text} speed={section.speed} />
            </h3>
          );
        }

        if (section.type === "item") {
          return (
            <p key={index} className="text-gray-400 text-sm ml-4">
              • <TypingText text={section.text} speed={section.speed} />
            </p>
          );
        }

        return null;
      })}
    </div>
  );
}

export default SkillsApp;