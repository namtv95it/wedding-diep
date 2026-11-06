import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer({ musicUrl, musicTitle }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Phát nhạc tự động sau tương tác đầu tiên của khách (touch hoặc click)
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
          })
          .catch(() => {
            // Trình duyệt chặn autoplay - chờ khách tự bấm
          });
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Audio playback prevented:', e));
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 select-none">
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      
      {isPlaying && (
        <div className="hidden sm:flex items-center gap-2 bg-stone-900/85 backdrop-blur-md text-stone-200 px-3 py-1.5 rounded-full text-xs shadow-lg border border-amber-500/20">
          <Music className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
          <span className="truncate max-w-[130px]">{musicTitle || 'Nhạc Cưới Lãng Mạn'}</span>
        </div>
      )}

      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl border active:scale-90 ${
          isPlaying
            ? 'bg-amber-600 text-white border-amber-300 ring-2 sm:ring-4 ring-amber-500/30 animate-spin-slow shadow-amber-900/40'
            : 'bg-stone-900/90 text-stone-300 border-stone-600 hover:text-white'
        }`}
        title={isPlaying ? 'Tắt nhạc nền' : 'Phát nhạc nền'}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-amber-100" />
        ) : (
          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400" />
        )}

        {/* Vinyl center dot */}
        {isPlaying && (
          <span className="absolute w-2 h-2 rounded-full bg-stone-900 border border-amber-200"></span>
        )}
      </button>
    </div>
  );
}
