import Clock from "./Clock";
import { useState } from "react";

function MenuBar() {
  const [showEditMenu, setShowEditMenu] = useState(false);
  return (
    <div
      className="absolute top-0 left-0 w-full h-8 bg-black/60 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 text-white text-sm"
    >
      {/* Left Side */}
      <div className="flex gap-6">
        <span className="font-semibold">PrashantOS</span>

        <span className="cursor-pointer hover:text-gray-300">File</span>
        <span className="cursor-pointer hover:text-gray-300">Edit</span>
        <span className="cursor-pointer hover:text-gray-300">View</span>

        <span className="cursor-pointer hover:text-gray-300">Help</span>
      </div>

      {/* Right Side */}
      <Clock />
    </div>
  );
}

export default MenuBar;
