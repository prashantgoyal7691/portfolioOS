import { useMusic } from "../context/MusicContext";
import { useState, useEffect } from "react";

function SongsApp() {
  const { playlist, playSong, currentSong, pauseSong, playing, audioRef } =
    useMusic();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", updateTime);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [audioRef]);

  return (
    <div className="p-6 text-white">
      <h2 className="text-xl mb-4">Songs</h2>

      {playlist.map((song, index) => (
        <div
          key={index}
          className={`flex justify-between p-2 hover:bg-white/10 rounded ${
            index === currentSong ? "bg-white/10" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <span>{song.name}</span>
            {index === currentSong && (
              <div className="w-full mt-2">
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={(e) => {
                    audioRef.current.currentTime = e.target.value;
                  }}
                  className="w-full"
                />
                <div className="text-xs text-gray-400 flex justify-between">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            )}

            {index === currentSong && (
              <div className="equalizer">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              if (index === currentSong && playing) {
                pauseSong(index);
              } else {
                playSong(index);
              }
            }}
            className="text-sm"
          >
            {index === currentSong && playing ? "Pause" : "Play"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SongsApp;
