import { info } from "autoprefixer";
import { Folder, TerminalWindow, MusicNotes, User, Envelope, FileText, GraduationCap } from "phosphor-react";

function DesktopIcon({ type, label, onOpen }) {
  const iconMap = {
    folder: <Folder size={48} color="#60a5fa" />,
    terminal: <TerminalWindow size={48} color="#22c55e" />,
    songs: <MusicNotes size={48} color="#aabbdd" />,
    about: <User size={48} color="#06b6d4" />,
    contact: <Envelope size={48} color="#94a3b8" />,
    file: <FileText size={48} color="#e5e7eb" />,
    Info: <GraduationCap size={48} color="#a78bfa" />,
  };
  return (
    <div
      onDoubleClick={onOpen}
      className="flex flex-col items-center cursor-pointer select-none hover:scale-110 transition duration-200"
    >
      <div className="text-white">{iconMap[type]}</div>

      <p className="text-sm mt-2 text-white text-center">{label}</p>
    </div>
  );
}

export default DesktopIcon;
