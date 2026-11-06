import React, { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Heart, Calendar, MapPin, Sparkles } from 'lucide-react';

const InvitationCardPreview = forwardRef(({
  targetUrl,
  guestName,
  guestRelation,
  guestPrefix = "Trân trọng kính mời",
  weddingData
}, ref) => {
  return (
    <div
      ref={ref}
      id="invitation-card-capture"
      className="relative w-full max-w-[420px] mx-auto bg-[#faf7f2] text-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#d4af37]/40 overflow-hidden font-body"
      style={{
        backgroundImage: `
          radial-gradient(circle at 10% 10%, rgba(212, 175, 55, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 90% 90%, rgba(225, 29, 72, 0.05) 0%, transparent 40%),
          linear-gradient(135deg, #fdfbf7 0%, #f7f1e6 50%, #f4ebd9 100%)
        `,
        boxShadow: '0 20px 40px -15px rgba(120, 53, 15, 0.2), 0 0 0 1px rgba(212, 175, 55, 0.3)'
      }}
    >
      {/* Khung viền kim loại đôi sang trọng */}
      <div className="absolute inset-3 sm:inset-4 border border-[#d4af37]/50 rounded-2xl pointer-events-none" />
      <div className="absolute inset-4 sm:inset-5 border border-dashed border-[#d4af37]/30 rounded-xl pointer-events-none" />

      {/* 4 góc hoa văn tinh tế */}
      <div className="absolute top-4 left-4 text-[#b8860b]/40 text-xs select-none">❖</div>
      <div className="absolute top-4 right-4 text-[#b8860b]/40 text-xs select-none">❖</div>
      <div className="absolute bottom-4 left-4 text-[#b8860b]/40 text-xs select-none">❖</div>
      <div className="absolute bottom-4 right-4 text-[#b8860b]/40 text-xs select-none">❖</div>

      {/* Nội dung thiệp */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Header thiệp */}
        <div className="flex items-center gap-2 text-[#996515] uppercase tracking-[0.25em] text-[11px] sm:text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>THIỆP MỜI THÀNH HÔN</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
        </div>

        {/* Tên Chú Rể & Cô Dâu */}
        <div className="my-2">
          <h2 className="font-script text-4xl sm:text-5xl text-rose-900 tracking-wide leading-tight">
            {weddingData.groom.shortName}
          </h2>
          <div className="flex items-center justify-center gap-3 my-1">
            <span className="h-px w-10 bg-amber-400/60" />
            <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
            <span className="h-px w-10 bg-amber-400/60" />
          </div>
          <h2 className="font-script text-4xl sm:text-5xl text-rose-900 tracking-wide leading-tight">
            {weddingData.bride.shortName}
          </h2>
        </div>

        {/* Khung Khách Mời Cá Nhân Hóa */}
        <div className="w-full my-4 py-3 px-4 rounded-xl bg-white/70 backdrop-blur-sm border border-amber-300/60 shadow-xs">
          <p className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
            {guestPrefix || "Trân trọng kính mời"}
          </p>
          <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-amber-950 mt-0.5 leading-snug">
            {guestName ? guestName : "Quý Khách Quý"}
          </div>
          {guestRelation && (
            <div className="inline-block mt-1 px-3 py-0.5 text-xs font-medium text-rose-800 bg-rose-50/80 rounded-full border border-rose-200/80">
              {guestRelation}
            </div>
          )}
        </div>

        {/* Khung Mã QR Code Nghệ Thuật */}
        <div className="my-2 p-3 sm:p-4 rounded-2xl bg-white shadow-md border-2 border-[#d4af37]/60 relative flex flex-col items-center">
          <div className="p-2 bg-stone-50 rounded-xl border border-stone-200/60">
            <QRCodeSVG
              value={targetUrl || window.location.origin}
              size={170}
              level="H"
              fgColor="#1c1917"
              bgColor="#ffffff"
              imageSettings={{
                src: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23e11d48'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>",
                x: undefined,
                y: undefined,
                height: 32,
                width: 32,
                excavate: true,
              }}
            />
          </div>
          <p className="mt-2 text-[11px] font-medium text-amber-900/90 tracking-wide">
            Quét mã để xem thiệp & xác nhận tham dự
          </p>
        </div>

        {/* Thông tin ngày giờ & địa điểm tóm tắt */}
        <div className="mt-2 text-stone-700 text-xs space-y-1">
          <div className="flex items-center justify-center gap-1.5 font-medium text-stone-800">
            <Calendar className="w-3.5 h-3.5 text-amber-700" />
            <span>11:30 • {weddingData.formattedDateDisplay}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-stone-600 text-[11px] px-2 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span className="truncate">{weddingData.events[2]?.location || "Trung Tâm Tiệc Cưới"}</span>
          </div>
        </div>

        {/* Lời cảm ơn chân thành */}
        <div className="mt-4 pt-3 border-t border-amber-300/40 w-full">
          <p className="text-[11px] font-serif-luxury italic text-stone-500">
            Rất hân hạnh được đón tiếp bạn trong ngày trọng đại!
          </p>
        </div>
      </div>
    </div>
  );
});

export default InvitationCardPreview;

