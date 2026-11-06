import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isPast) {
    return (
      <div className="py-4 px-3 text-center">
        <p className="text-base sm:text-lg font-serif-luxury text-rose-800 font-semibold flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 fill-rose-600 text-rose-600 animate-bounce" />
          Hôn lễ đã diễn ra trọn vẹn hạnh phúc!
          <Heart className="w-4 h-4 fill-rose-600 text-rose-600 animate-bounce" />
        </p>
      </div>
    );
  }

  const items = [
    { label: 'NGÀY', value: timeLeft.days },
    { label: 'GIỜ', value: timeLeft.hours },
    { label: 'PHÚT', value: timeLeft.minutes },
    { label: 'GIÂY', value: timeLeft.seconds }
  ];

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 py-3 sm:py-5 max-w-sm mx-auto">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex-1 flex flex-col items-center justify-center py-2.5 px-1 sm:py-3.5 sm:px-2 rounded-xl sm:rounded-2xl bg-white/95 backdrop-blur-md border border-amber-300/80 shadow-md shadow-amber-950/10 text-stone-800"
        >
          <span className="text-xl sm:text-3xl font-bold font-serif-luxury text-amber-950 leading-none">
            {String(item.value).padStart(2, '0')}
          </span>
          <span className="text-[9px] sm:text-[11px] tracking-wider text-amber-800/90 font-semibold mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
