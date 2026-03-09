import { FaFolder, FaTerminal, FaFileAlt ,FaUser,FaAddressCard} from "react-icons/fa";

function DesktopIcon({ type, label, onOpen }) {

  const iconMap = {
    folder: <FaFolder size={40} color="#3b82f6"/>,
    terminal: <FaTerminal size={40} color="#04DF72" />,
    file: <FaFileAlt size={40} />,
    about: <FaUser size={40} color="#22d3ee"/>,
    contact: <FaAddressCard size={40}/>
  };
  return (
    <div
      onDoubleClick={onOpen}
      className="flex flex-col items-center cursor-pointer select-none hover:scale-110 transition duration-200"
    >
      <div className="text-white">
        {iconMap[type]}
      </div>

      <p className="text-sm mt-2 text-white text-center">
        {label}
      </p>
    </div>
  );
}

export default DesktopIcon;