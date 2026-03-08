import Draggable from "react-draggable";
import { useRef, useState, useEffect } from "react";

function Window({ title, onClose, children,isFocused, onFocus, x = 160, y = 120 }) {
  const nodeRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  useEffect(() => {
    const t = setTimeout(() => setIsOpen(true), 10);
    return () => clearTimeout(t);
  }, []);


  // Close context menu when clicking outside the window
  useEffect(() => {
    if (!contextMenu) return;

    const handleClickOutside = (e) => {
      if (nodeRef.current && !nodeRef.current.contains(e.target)) {
        setContextMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  return (
    <Draggable handle=".window-header" nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        onClick={onFocus}
        onContextMenu={(e) => {
          e.preventDefault();
          setContextMenu({ x: e.clientX, y: e.clientY });
        }}
        style={isMaximized ? { top: 0, left: 0 } : { top: y, left: x }}
        className={`window absolute flex flex-col transition-all duration-300 ease-out
  ${isFocused ? "window-active" : ""}
  ${isMaximized ? "top-0 left-0 w-full h-full rounded-none" : "w-[520px] h-[350px]"}
  ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"}
  bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl`}
      >
        <div
          className="window-header flex items-center justify-between px-4 py-2 bg-white/10 backdrop-blur-md rounded-t-xl cursor-move"
          onDoubleClick={toggleMaximize}
        >
          <div className="flex gap-2 group">
            {/* Close */}
            <div
              onClick={onClose}
              className="w-3 h-3 bg-red-500 rounded-full cursor-pointer 
    flex items-center justify-center text-[10px] text-black
    transition-transform duration-150 hover:scale-110"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[11px] font-bold text-black leading-none">
      ×
    </span>
            </div>

            {/* Minimize */}
            <div
              className="w-3 h-3 bg-yellow-400 rounded-full 
    flex items-center justify-center text-[10px] text-black
    transition-transform duration-150 hover:scale-110"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[11px] font-bold text-black leading-none">−</span>
            </div>

            {/* Maximize */}
            <div
              onClick={toggleMaximize}
              className="w-3 h-3 bg-green-500 rounded-full cursor-pointer
    flex items-center justify-center text-[9px] text-black
    transition-transform duration-150 hover:scale-110"
            >
              <span className="opacity-0 group-hover:opacity-100 text-[11px] font-bold text-black leading-none">
              ⤢
              </span>
            </div>
          </div>

          <span className="text-sm text-gray-300">{title}</span>

          <div></div>
        </div>

        <div className="p-6 flex-1 overflow-y-auto text-white">{children}</div>

        {contextMenu && (
          <div
            style={{
              position: "fixed",
              top: contextMenu.y,
              left: contextMenu.x
            }}
            className="bg-black/90 border border-white/20 rounded shadow-lg text-sm z-50"
          >
            <div
              className="px-4 py-2 hover:bg-white/10 cursor-pointer"
              onClick={() => {
                window.dispatchEvent(new Event("duplicate-window"));
                setContextMenu(null);
              }}
            >
              Duplicate Window
            </div>
            <div
              className="px-4 py-2 hover:bg-red-500/30 cursor-pointer text-red-400"
              onClick={() => {
                setContextMenu(null);
                onClose();
              }}
            >
              Exit
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
}

export default Window;
