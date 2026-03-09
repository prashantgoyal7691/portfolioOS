import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import TypingText from "../components/ui/TypingText";
function ContactApp() {

  const sections = [
    {
      type: "title",
      text: "Contact",
      speed: 20
    },
    {
      type: "link",
      icon: faEnvelope,
      color: "text-red-400",
      href: "mailto:prashantgo7691@gmail.com",
      text: "prashantgo7691@gmail.com",
      speed: 15
    },
    {
      type: "link",
      icon: faLinkedin,
      color: "text-blue-500",
      href: "https://www.linkedin.com/in/prashantgoyal7691",
      text: "linkedin.com/in/prashantgoyal7691",
      speed: 15
    },
    {
      type: "link",
      icon: faGithub,
      color: "text-gray-300",
      href: "https://github.com/prashantgoyal7691",
      text: "github.com/prashantgoyal7691",
      speed: 15
    },
    {
      type: "link",
      icon: faInstagram,
      color: "text-pink-400",
      href: "https://www.instagram.com/prashant_goyal19",
      text: "instagram.com/prashant_goyal19",
      speed: 15
    },
    {
      type: "paragraph",
      text: "Feel free to reach out for collaborations, opportunities, or tech discussions.",
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
    <div className="p-6 text-white space-y-6">

      {sections.slice(0, visibleCount).map((section, index) => {

        if (section.type === "title") {
          return (
            <h2 key={index} className="text-2xl font-semibold">
              <TypingText text={section.text} speed={section.speed} />
            </h2>
          );
        }

        if (section.type === "link") {
          return (
            <p key={index} className="flex items-center gap-3 text-sm">
              <FontAwesomeIcon icon={section.icon} className={section.color} />
              <a
                href={section.href}
                target="_blank"
                className="hover:text-blue-400"
              >
                <TypingText text={section.text} speed={section.speed} />
              </a>
            </p>
          );
        }

        return (
          <div key={index} className="pt-4 text-gray-400 text-sm">
            <TypingText text={section.text} speed={section.speed} />
          </div>
        );

      })}

    </div>
  );
}

export default ContactApp;