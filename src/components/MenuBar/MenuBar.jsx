import Clock from "./Clock";
import BatteryStatus from "./batteryStatus";
import { useState, useEffect, useRef } from "react";
import { useMusic } from "../../context/MusicContext";

function MenuBar({ openWindow }) {
  const menuRef = useRef(null);
  const [showSystemMenu, setShowSystemMenu] = useState(false);
  const [showMusicMenu, setShowMusicMenu] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const helpRef = useRef(null);
  const viewRef = useRef(null);
  const musicRef = useRef(null);
  const {
    playlist,
    currentSong,
    togglePlay,
    playing,
    nextSong,
    prevSong,
    audioRef,
  } = useMusic();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!(event.target instanceof Node)) return;

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowSystemMenu(false);
      }

      if (viewRef.current && !viewRef.current.contains(event.target)) {
        setShowViewMenu(false);
      }
      if (musicRef.current && !musicRef.current.contains(event.target)) {
        setShowMusicMenu(false);
      }
      if (helpRef.current && !helpRef.current.contains(event.target)) {
        setShowHelpMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-8 bg-black/10 backdrop-blur-md z-100 border-b border-white/10 flex items-center justify-between px-4 text-white text-sm">
      {/* Left Side */}
      <div className="flex gap-6 z-100">
        <div
          className="relative"
          ref={menuRef}
          onClick={() => setShowSystemMenu(!showSystemMenu)}
        >
          <span className="relative font-semibold cursor-pointer hover:text-gray-300">
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

        <div
          className="relative"
          ref={viewRef}
          onClick={() => setShowViewMenu(!showViewMenu)}
        >
          <span className="cursor-pointer hover:text-gray-300">View</span>
          {showViewMenu && (
            <div className="absolute top-8 left-0 w-56 bg-black/80 backdrop-blur-md border border-white/10 rounded-md text-sm flex flex-col z-50">
              <div className="px-4 py-2 text-gray-400 text-xs">
                Icon Arrangement
              </div>

              <div
                className="px-4 py-2 hover:bg-white/10 cursor-pointer"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("icons-default"))
                }
              >
                Default
              </div>

              <div
                className="px-4 py-2 hover:bg-white/10 cursor-pointer"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("icons-asc"))
                }
              >
                By Name
              </div>

              <div
                className="px-4 py-2 hover:bg-white/10 cursor-pointer border-b border-white/10"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("icons-desc"))
                }
              >
                reversed
              </div>
            </div>
          )}
        </div>

        <div
          className="relative"
          ref={helpRef}
          onClick={() => setShowHelpMenu(!showHelpMenu)}
        >
          <span className="cursor-pointer hover:text-gray-300">Help</span>

          {showHelpMenu && (
            <div className="absolute top-8 left-0 w-48 bg-black/80 backdrop-blur-md border border-white/10 rounded-md text-sm flex flex-col z-50">
              <div
                className="px-4 py-2 hover:bg-white/10 cursor-pointer"
                onClick={() => {
                  openWindow("feedback");
                  setShowHelpMenu(false);
                }}
              >
                Send Feedback
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 ml-auto">
        <div
          className="cursor-pointer relative"
          ref={musicRef}
          onClick={() => setShowMusicMenu(!showMusicMenu)}
        >
          <span className="relative font-semibold cursor-pointer hover:text-gray-300">
            🎵
          </span>
          {showMusicMenu && (
            <div className="absolute right-20 top-8 w-64 bg-black/80 backdrop-blur-md border border-white/10 rounded-lg p-4 z-50">
              <p className="text-white text-sm mb-2">Now Playing</p>
              <p className="text-gray-300 text-xs mb-3">
                {playlist[currentSong]?.name}
              </p>

              <div className="flex gap-4 mb-4 justify-center">
                <button onClick={prevSong}>⏮</button>

                <button onClick={togglePlay}>{playing ? "⏸" : "▶"}</button>

                <button onClick={nextSong}>⏭</button>
              </div>
              <div className="flex items-center gap-2">
                <span>🔊</span>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={(e) => {
                    const v = e.target.value;
                    setVolume(v);
                    audioRef.current.volume = v;
                  }}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>
        <BatteryStatus />
        <Clock />
      </div>
    </div>
  );
}

export default MenuBar;
