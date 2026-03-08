import { useState, useEffect } from "react";
import TypingText from "../components/ui/TypingText";

function AboutApp() {

  const sections = [
    {
      type: "title",
      text: "Prashant Goyal",
      speed: 20
    },
    {
      type: "paragraph",
      text: "Computer Science student who enjoys building web applications, solving algorithmic problems, and constantly exploring new ideas in technology.",
      speed: 15
    },
    {
      type: "tag",
      text: "Technical Interests",
      speed: 20
    },
    {
      type: "paragraph",
      text: `• Data Structures & Algorithms
• Backend Development
• Building scalable web applications`,
      speed: 15
    },
    {
      type: "tag",
      text: "Beyond Academics",
      speed: 20
    },
    {
      type: "paragraph",
      text: `• Listening to music and discovering new artists
• Watching movies and web series
• Exploring new technologies and developer tools
• Building side projects and experimenting with ideas
• Learning about startups, products, and technology trends
• Solving logical and algorithmic problems`,
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
            <h2 key={index} className="text-xl font-semibold text-white">
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

export default AboutApp;
