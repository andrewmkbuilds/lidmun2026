import { useState, useEffect, useRef } from "react";

const AUDIO_URL = "https://lidmun.officialmun.workers.dev/assets/music/main.mp3";
const STORAGE_KEY = "lidmun_music_preference";
const CHORUS_START = 78; // skip intro, jump to chorus

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [preferenceSet, setPreferenceSet] = useState(false);

  useEffect(() => {
    // Always prompt on every reload
    setShowModal(true);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setPreferenceSet(true);
    }
  }, []);

  const setPreference = (choice) => {
    localStorage.setItem(STORAGE_KEY, choice);
    setShowModal(false);
    setPreferenceSet(true);
    if (choice === "yes" && audioRef.current) {
      audioRef.current.currentTime = CHORUS_START;
      audioRef.current.volume = 0.4;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.currentTime = CHORUS_START;
      audioRef.current.volume = 0.4;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={AUDIO_URL} type="audio/mpeg" />
      </audio>

      {/* Music Preference Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[9999] px-4">
          <div className="bg-black/90 border border-white/20 p-8 w-full max-w-md text-center">
            <div className="text-3xl mb-4">🎵</div>
            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>MUSIC PREFERENCE</h2>
            <p className="text-white/60 mb-8 text-sm">Would you like to enable background music for this session?</p>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setPreference("yes")} className="btn-secondary">
                &gt;&gt; YES
              </button>
              <button onClick={() => setPreference("no")} className="btn-primary">
                &gt;&gt; NO
              </button>
            </div>
            <p className="text-xs font-mono text-white/40 mt-6">You can change this preference anytime</p>
          </div>
        </div>
      )}

      {/* Music Toggle Button */}
      {preferenceSet && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-[9998] inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-black/80 backdrop-blur-md font-mono text-xs tracking-wider uppercase text-white/70 hover:text-white hover:border-white/40 transition-all"
        >
          {isPlaying ? "⏸ STOP MUSIC" : "▶ PLAY MUSIC"}
        </button>
      )}
    </>
  );
}