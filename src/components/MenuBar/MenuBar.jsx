import { option } from "framer-motion/client";
import Clock from "./Clock";
import { useState,useEffect,useRef } from "react";

function MenuBar({ openWindow }) {
  const menuRef = useRef(null);
  const [showSystemMenu, setShowSystemMenu] = useState(false);
  const options = ()=>{
    setShowSystemMenu(!showSystemMenu)
    console.log(showSystemMenu);
  }

  useEffect(() => {
  const handleClickOutside = (event) => {
    if(menuRef.current && !menuRef.current.contains(event.target)) {
      setShowSystemMenu(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  return (
    <div className="absolute top-0 left-0 w-full h-8 bg-black/60 backdrop-blur-md z-100 border-b border-white/10 flex items-center justify-between px-4 text-white text-sm">
      {/* Left Side */}
      <div className="flex gap-6 z-100" >
        <div className="relative" ref={menuRef} onClick={() => options()}>
          <span
            className="relative font-semibold cursor-pointer hover:text-gray-300"
          >
            portfolioOS
          </span>
          {showSystemMenu && (
            <div className="absolute top-8 left-0 w-48 bg-black/80 backdrop-blur-md border border-white/10 rounded-md text-sm flex flex-col z-50">
              <div
                className="px-4 py-2 hover:bg-white/10 cursor-pointer"
                onClick={() => {
                  openWindow("system");
                  setShowSystemMenu(false);
                }}
              >
                About This Portfolio
              </div>

              <div
                className="px-4 py-2 hover:bg-white/10 cursor-pointer"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Restart Desktop
              </div>
            </div>
          )}
        
        </div>

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
