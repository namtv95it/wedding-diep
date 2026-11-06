import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Heart, Sparkles, X } from 'lucide-react';

export default function EnvelopeModal({ guestName, guestRelation, guestPrefix, groomName, brideName, onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    // Bắn pháo hoa confetti lãng mạn
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#fb7185', '#fbbf24', '#f59e0b', '#fbcfe8']
      });
    } catch {
      // fallback
    }

    setTimeout(() => {
      setIsDismissed(true);
      if (onOpen) onOpen();
    }, 850);
  };

  if (isDismissed) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md transition-opacity duration-500">
      <div 
        className={`relative w-full max-w-md bg-gradient-to-b from-[#fdfbf7] via-[#faf6ee] to-[#f5ede0] rounded-3xl p-4 sm:p-8 shadow-2xl border-2 border-amber-300/80 text-center transition-all duration-700 transform ${
          isOpen ? 'scale-90 opacity-0 -translate-y-8' : 'scale-100 opacity-100'
        }`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(120, 53, 15, 0.35), inset 0 0 30px rgba(245, 158, 11, 0.08)'
        }}
      >
        {/* Nút đóng nhanh nếu muốn xem luôn */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-3 right-3 text-stone-400 hover:text-stone-700 p-1.5 rounded-full"
          title="Đóng thiệp"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Viền hoa văn kim tuyến */}
        <div className="border border-amber-300/50 p-4 sm:p-6 rounded-2xl relative">
          <div className="text-amber-800/80 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>THIỆP MỜI THÀNH HÔN</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>

          <h1 className="font-script text-4xl sm:text-5xl text-rose-900 my-2 leading-tight">
            {groomName} & {brideName}
          </h1>

          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-3" />

          {guestName ? (
            <div className="my-3 bg-white/90 p-3.5 rounded-xl border border-amber-200/80 shadow-xs">
              <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold mb-0.5">
                {guestPrefix || 'Trân trọng kính mời'}
              </p>
              <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-amber-950">
                {guestName}
              </h2>
              {guestRelation && (
                <span className="inline-block mt-1 px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  {guestRelation}
                </span>
              )}
            </div>
          ) : (
            <div className="my-3">
              <p className="text-stone-700 font-serif-luxury italic text-base sm:text-lg">
                Trân trọng kính mời bạn đến chung vui cùng gia đình chúng mình!
              </p>
            </div>
          )}

          <p className="text-stone-600 text-xs font-light mt-3 mb-5 leading-relaxed px-1">
            Sự hiện diện của bạn là món quà ý nghĩa nhất và là niềm hạnh phúc to lớn đối với chúng mình!
          </p>

          {/* Nút bấm con dấu mở thiệp */}
          <button
            onClick={handleOpenInvitation}
            className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2.5 px-8 rounded-full bg-gradient-to-r from-amber-700 via-rose-700 to-amber-800 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase shadow-lg active:scale-95 transition-all duration-200"
          >
            <Mail className="w-4 h-4" />
            <span>Chạm Để Mở Thiệp</span>
            <Heart className="w-3.5 h-3.5 text-rose-200 fill-rose-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
