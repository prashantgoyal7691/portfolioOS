import { createContext, useContext, useRef, useState } from "react";

const MusicContext = createContext();

export function MusicProvider({ children }) {

  const audioRef = useRef(null);

  const playlist = [
    { name: "Horrortheme1", file: "/songs/vibehorn-scary-horror-music-horror-495564.mp3" }
  ];

  const [currentSong, setCurrentSong] = useState(0);
  const [playing, setPlaying] = useState(false);

  const playSong = (index) => {
    setCurrentSong(index);
    setPlaying(true);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }, 0);
  };

  const pauseSong = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();
    setPlaying(false);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlaying(!playing);
  };

  const nextSong = () => {
    const next = (currentSong + 1) % playlist.length;
    playSong(next);
  };

  const prevSong = () => {
    const prev = currentSong === 0 ? playlist.length - 1 : currentSong - 1;
    playSong(prev);
  };

  return (
    <MusicContext.Provider
      value={{
        playlist,
        currentSong,
        playing,
        playSong,
        pauseSong,
        togglePlay,
        nextSong,
        prevSong,
        audioRef
      }}
    >
      <audio
        ref={audioRef}
        src={playlist[currentSong].file}
        onEnded={nextSong}
      />

      {children}

    </MusicContext.Provider>
  );
}

export const useMusic = () => useContext(MusicContext);