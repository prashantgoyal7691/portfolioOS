import { useState, useEffect } from "react";
import TypingText from "../components/ui/TypingText";

function EducationApp() {

  const sections = [
    {
      type: "title",
      text: "Education",
      speed: 20
    },
    {
      type: "tag",
      text: "Bachelor of Technology – Computer Science & Engineering",
      speed: 20
    },
    {
      type: "paragraph",
      text: `College: National Institute of Technology, Srinagar
Aug 2023 – Present
CGPA: 8.061`,
      speed: 15
    },
    {
      type: "tag",
      text: "Senior Secondary Education (Class XII)",
      speed: 20
    },
    {
      type: "paragraph",
      text: `School: Nirmal Happy Sr. Sec. School, Hindaun City
Board of Secondary Education, Rajasthan
Stream: Science (PCM)
Year: 2023
Percentage: 87%`,
      speed: 15
    },
    {
      type: "tag",
      text: "Secondary Education (Class X)",
      speed: 20
    },
    {
      type: "paragraph",
      text: `School: Shri Om Sr. Sec. School, Dhindhora
Board of Secondary Education, Rajasthan
Year: 2021
Percentage: 98%`,
      speed: 15
    }
  ];

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
    <div className="p-6 text-white space-y-4 leading-relaxed">

      {sections.slice(0, visibleCount).map((section, index) => {

        if (section.type === "title") {
          return (
            <h2 key={index} className="text-xl font-semibold">
              <TypingText text={section.text} speed={section.speed} />
            </h2>
          );
        }

        if (section.type === "tag") {
          return (
            <div key={index} className="pt-2">
              <span className="font-semibold text-blue-400">
                <TypingText text={section.text} speed={section.speed} />
              </span>
            </div>
          );
        }

        return (
          <div key={index} className="text-gray-300 whitespace-pre-line">
            <TypingText text={section.text} speed={section.speed} />
          </div>
        );

      })}

    </div>
  );
}

export default EducationApp;