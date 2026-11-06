import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Clock, 
  Phone, 
  Copy, 
  Check, 
  Send, 
  ExternalLink, 
  Sparkles,
  Maximize2,
  X,
  CreditCard
} from 'lucide-react';
import Countdown from './Countdown';
import EnvelopeModal from './EnvelopeModal';

export default function InvitationView({ weddingData }) {
  // Lấy params từ URL
  const [guestName, setGuestName] = useState('');
  const [guestRelation, setGuestRelation] = useState('');
  const [guestPrefix, setGuestPrefix] = useState('Trân trọng kính mời');
  
  // State copy số tài khoản
  const [copiedAccount, setCopiedAccount] = useState('');
  
  // State tab mừng cưới trên mobile: 'groom' | 'bride'
  const [activeBankTab, setActiveBankTab] = useState('groom');

  // State xem ảnh to
  const [selectedImage, setSelectedImage] = useState(null);

  // State RSVP & Lời chúc
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttending, setRsvpAttending] = useState('yes');
  const [rsvpGuestsCount, setRsvpGuestsCount] = useState('1');
  const [rsvpWishes, setRsvpWishes] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [wishesList, setWishesList] = useState([
    {
      name: 'Nguyễn Minh Tuấn',
      relation: 'Bạn chú rể',
      wishes: 'Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long, mãi mãi mặn nồng như thuở ban đầu nhé!',
      time: 'Vừa xong'
    },
    {
      name: 'Thanh Hằng & Quốc Bảo',
      relation: 'Đồng nghiệp cô dâu',
      wishes: 'Chúc mừng cô dâu chú rể! Hạnh phúc viên mãn và sớm đón thiên thần nhỏ nha!',
      time: '1 giờ trước'
    }
  ]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('to') || params.get('guest');
    const relation = params.get('role') || params.get('relation');
    const prefix = params.get('prefix');

    if (guest) setGuestName(decodeURIComponent(guest));
    if (relation) setGuestRelation(decodeURIComponent(relation));
    if (prefix) setGuestPrefix(decodeURIComponent(prefix));

    if (guest) {
      setRsvpName(decodeURIComponent(guest));
    }

    const savedWishes = localStorage.getItem('wedding_wishes');
    if (savedWishes) {
      try {
        setWishesList(JSON.parse(savedWishes));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(key);
    setTimeout(() => setCopiedAccount(''), 2500);
  };

  const handleSubmitRSVP = (e) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpWishes.trim()) return;

    const newWish = {
      name: rsvpName.trim(),
      relation: guestRelation || 'Khách mời',
      wishes: rsvpWishes.trim(),
      attending: rsvpAttending === 'yes' ? `Tham dự (${rsvpGuestsCount} người)` : 'Không thể tham dự',
      time: 'Vừa xong'
    };

    const updated = [newWish, ...wishesList];
    setWishesList(updated);
    localStorage.setItem('wedding_wishes', JSON.stringify(updated));
    setRsvpSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-800 font-body relative overflow-x-hidden">
      {/* Modal phong bì mở đầu */}
      <EnvelopeModal
        guestName={guestName}
        guestRelation={guestRelation}
        guestPrefix={guestPrefix}
        groomName={weddingData.groom.shortName}
        brideName={weddingData.bride.shortName}
      />

      {/* HERO SECTION - Tối ưu tỷ lệ trên điện thoại */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center text-center px-4 py-12 sm:py-20 overflow-hidden">
        {/* Background Image with warm overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-900/60 to-stone-950/85 z-10" />

        <div className="relative z-20 w-full max-w-xl mx-auto text-white space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[10px] sm:text-xs tracking-[0.25em] uppercase text-amber-200">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>SAVE THE DATE</span>
            <Sparkles className="w-3 h-3 text-amber-300" />
          </div>

          {/* Tên dâu rể trên mobile đậm và rõ hơn */}
          <div className="space-y-1">
            <h1 className="font-script text-5xl sm:text-7xl text-amber-100 leading-tight drop-shadow-md">
              {weddingData.groom.shortName}
            </h1>
            <div className="flex items-center justify-center gap-2 text-rose-300">
              <span className="h-px w-8 bg-amber-400/50" />
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
              <span className="h-px w-8 bg-amber-400/50" />
            </div>
            <h1 className="font-script text-5xl sm:text-7xl text-amber-100 leading-tight drop-shadow-md">
              {weddingData.bride.shortName}
            </h1>
          </div>

          <p className="text-[11px] sm:text-xs tracking-[0.25em] font-light text-stone-300 uppercase">
            WE ARE GETTING MARRIED
          </p>

          <div className="w-24 sm:w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />

          <div>
            <p className="font-serif-luxury text-lg sm:text-2xl text-amber-200 font-medium">
              {weddingData.formattedDateDisplay}
            </p>
            <p className="text-[11px] sm:text-xs text-stone-300 italic font-light mt-0.5">
              {weddingData.lunarDate}
            </p>
          </div>

          {/* Hộp Lời Mời Cá Nhân Hóa Đích Danh Khách Mời */}
          {guestName && (
            <div className="mt-4 sm:mt-6 max-w-sm mx-auto bg-stone-950/80 backdrop-blur-md border border-amber-400/50 rounded-2xl p-4 sm:p-5 shadow-2xl">
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-300/90 font-medium">
                {guestPrefix}
              </p>
              <div className="text-xl sm:text-2xl font-serif-luxury font-bold text-white mt-1">
                {guestName}
              </div>
              {guestRelation && (
                <div className="inline-block mt-1.5 px-3 py-0.5 text-[11px] font-medium text-amber-200 bg-amber-900/60 rounded-full border border-amber-500/40">
                  {guestRelation}
                </div>
              )}
              <p className="text-[11px] sm:text-xs text-stone-300 mt-2 font-light leading-relaxed">
                Đến tham dự buổi tiệc chung vui cùng gia đình hai chúng mình!
              </p>
            </div>
          )}

          {/* Countdown timer */}
          <div className="pt-2">
            <Countdown targetDate={weddingData.weddingDate} />
          </div>
        </div>
      </section>

      {/* LỜI NGỎ & CÂU CHUYỆN TÌNH YÊU - Timeline gọn gàng cho mobile */}
      <section className="py-12 sm:py-16 px-4 max-w-3xl mx-auto text-center">
        <div className="text-rose-700 uppercase tracking-widest text-[11px] font-semibold mb-1">
          HÀNH TRÌNH TÌNH YÊU
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-amber-950 mb-3">
          Lời Ngỏ Từ Đôi Uyên Ương
        </h2>
        <div className="w-12 h-0.5 bg-amber-600 mx-auto rounded-full mb-5" />
        
        <p className="text-stone-600 font-serif-luxury italic text-base sm:text-lg leading-relaxed max-w-xl mx-auto px-2">
          "{weddingData.invitationMessage}"
        </p>

        {/* Timeline dọc tinh tế tiết kiệm diện tích trên mobile */}
        <div className="mt-10 relative border-l-2 border-amber-300/60 ml-4 sm:ml-8 text-left space-y-6">
          {weddingData.loveStory.map((story, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Dot icon */}
              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-amber-600 border-2 border-white shadow-xs" />
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200/70 shadow-xs">
                <span className="inline-block text-[10px] font-bold tracking-wider text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full mb-1">
                  NĂM {story.year}
                </span>
                <h3 className="text-base font-serif-luxury font-bold text-stone-900 mt-1 mb-1">
                  {story.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {story.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CÔ DÂU & CHÚ RỂ - Avatar & thông tin cân đối */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#f5ede0] to-[#faf7f2] px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-rose-700 uppercase tracking-widest text-[11px] font-semibold mb-1">
              NHÂN VẬT CHÍNH
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-amber-950">
              Chú Rể & Cô Dâu
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            {/* Chú rể */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-amber-200/80 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-amber-300 shadow-md mb-4">
                <img 
                  src={weddingData.groom.avatar} 
                  alt={weddingData.groom.fullName}
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-amber-700 font-semibold mb-0.5">
                {weddingData.groom.roleTitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-900 mb-2">
                {weddingData.groom.fullName}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 flex-1 px-2">
                {weddingData.groom.bio}
              </p>
              <a
                href={`tel:${weddingData.groom.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 px-4 py-2 rounded-full border border-amber-300 transition"
              >
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>Liên hệ: {weddingData.groom.phone}</span>
              </a>
            </div>

            {/* Cô dâu */}
            <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-rose-200/80 flex flex-col items-center text-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-rose-300 shadow-md mb-4">
                <img 
                  src={weddingData.bride.avatar} 
                  alt={weddingData.bride.fullName}
                  className="w-full h-full object-cover" 
                />
              </div>
              <span className="text-[11px] uppercase tracking-widest text-rose-700 font-semibold mb-0.5">
                {weddingData.bride.roleTitle}
              </span>
              <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-stone-900 mb-2">
                {weddingData.bride.fullName}
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 flex-1 px-2">
                {weddingData.bride.bio}
              </p>
              <a
                href={`tel:${weddingData.bride.phone}`}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-900 bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-full border border-rose-300 transition"
              >
                <Phone className="w-3.5 h-3.5 text-rose-700" />
                <span>Liên hệ: {weddingData.bride.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* THÔNG TIN HAI BÊN GIA ĐÌNH - Gọn nhẹ trên mobile */}
      <section className="py-10 sm:py-14 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <div className="text-rose-700 uppercase tracking-widest text-[11px] font-semibold mb-1">
            ĐẠI DIỆN HAI HỌ
          </div>
          <h2 className="text-2xl font-serif-luxury font-bold text-amber-950">
            Gia Đình Hai Bên
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Nhà Trai */}
          <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs text-center">
            <h3 className="text-base font-serif-luxury font-bold text-amber-900 border-b border-amber-200 pb-2 mb-3">
              NHÀ TRAI
            </h3>
            <div className="space-y-1 text-stone-700 text-xs sm:text-sm">
              <p><strong className="text-stone-900">Thân phụ:</strong> {weddingData.parents.groomSide.father}</p>
              <p><strong className="text-stone-900">Thân mẫu:</strong> {weddingData.parents.groomSide.mother}</p>
              <p className="text-[11px] text-stone-500 pt-1 flex items-start justify-center gap-1">
                <MapPin className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
                <span>{weddingData.parents.groomSide.location}</span>
              </p>
            </div>
          </div>

          {/* Nhà Gái */}
          <div className="bg-white p-5 rounded-2xl border border-rose-200/80 shadow-xs text-center">
            <h3 className="text-base font-serif-luxury font-bold text-rose-900 border-b border-rose-200 pb-2 mb-3">
              NHÀ GÁI
            </h3>
            <div className="space-y-1 text-stone-700 text-xs sm:text-sm">
              <p><strong className="text-stone-900">Thân phụ:</strong> {weddingData.parents.brideSide.father}</p>
              <p><strong className="text-stone-900">Thân mẫu:</strong> {weddingData.parents.brideSide.mother}</p>
              <p className="text-[11px] text-stone-500 pt-1 flex items-start justify-center gap-1">
                <MapPin className="w-3 h-3 text-stone-400 shrink-0 mt-0.5" />
                <span>{weddingData.parents.brideSide.location}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SỰ KIỆN & LỊCH TRÌNH */}
      <section className="py-12 sm:py-16 bg-stone-100/70 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-rose-700 uppercase tracking-widest text-[11px] font-semibold mb-1">
              THỜI GIAN & ĐỊA ĐIỂM
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-amber-950">
              Lịch Trình Hôn Lễ
            </h2>
          </div>

          <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-5">
            {weddingData.events.map((evt) => (
              <div 
                key={evt.id}
                className="bg-white rounded-2xl p-5 shadow-xs border border-amber-200 flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider text-amber-900 bg-amber-50 border border-amber-200 mb-3">
                    {evt.title}
                  </div>

                  <div className="space-y-2.5 mb-5">
                    <div className="flex items-start gap-2 text-stone-800 text-xs sm:text-sm font-medium">
                      <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <div>{evt.time}</div>
                        <div className="text-[11px] text-stone-500 font-normal italic">({evt.lunarTime})</div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 text-stone-700 text-xs sm:text-sm">
                      <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-stone-900">{evt.location}</div>
                        <div className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">{evt.address}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href={evt.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-11 inline-flex items-center justify-center gap-1.5 rounded-xl text-xs font-semibold bg-amber-700 hover:bg-amber-800 active:scale-98 text-white transition shadow-xs"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Xem Chỉ Đường Bản Đồ</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALBUM ẢNH CƯỚI - Tối ưu 2 cột trên điện thoại */}
      <section className="py-12 sm:py-16 px-3 sm:px-4 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-rose-700 uppercase tracking-widest text-[11px] font-semibold mb-1">
            KHOẢNH KHẮC NGỌT NGÀO
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-amber-950">
            Album Ảnh Kỷ Niệm
          </h2>
          <p className="text-stone-500 text-xs mt-1">
            Chạm vào ảnh để xem trọn vẹn ở kích thước lớn
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4">
          {weddingData.gallery.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(photo)}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer bg-stone-200 shadow-xs active:scale-95 transition-transform"
            >
              <img 
                src={photo.url} 
                alt={photo.caption}
                loading="lazy"
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 sm:p-3 text-white">
                <span className="text-[10px] text-amber-200 flex items-center gap-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>Xem ảnh</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL PHÓNG TO ẢNH */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-2xl max-h-[92vh] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 text-white hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>
            <img 
              src={selectedImage.url} 
              alt={selectedImage.caption} 
              className="max-h-[75vh] w-auto object-contain mx-auto"
            />
            {selectedImage.caption && (
              <div className="p-3 bg-stone-900 text-stone-200 text-center text-xs font-medium">
                {selectedImage.caption}
              </div>
            )}
          </div>
        </div>
      )}

      {/* HỘP MỪNG CƯỚI - Tối ưu dạng Tab chuyển đổi trên Mobile */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-[#faf7f2] to-[#f4eee4] px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-rose-700 uppercase tracking-widest text-[11px] font-semibold mb-1">
            HỘP MỪNG CƯỚI
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-amber-950 mb-2">
            Gửi Quà Mừng & Chúc Phúc
          </h2>
          <p className="text-stone-600 text-xs max-w-md mx-auto mb-6">
            Dành cho bạn bè và người thân ở xa muốn gửi gắm tình cảm và lời chúc phúc đến đôi uyên ương.
          </p>

          {/* Tab chọn Chú Rể / Cô Dâu trên Mobile */}
          <div className="flex sm:hidden max-w-xs mx-auto p-1 bg-stone-200/80 rounded-full mb-6">
            <button
              onClick={() => setActiveBankTab('groom')}
              className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
                activeBankTab === 'groom'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Mừng Chú Rể
            </button>
            <button
              onClick={() => setActiveBankTab('bride')}
              className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
                activeBankTab === 'bride'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Mừng Cô Dâu
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Chú rể */}
            <div className={`bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-amber-200 flex flex-col items-center ${
              activeBankTab === 'groom' ? 'block' : 'hidden sm:flex'
            }`}>
              <span className="text-[11px] uppercase tracking-wider text-amber-800 font-semibold mb-1">
                MỪNG CƯỚI CHÚ RỂ
              </span>
              <h3 className="text-lg font-serif-luxury font-bold text-stone-900 mb-3">
                {weddingData.groom.fullName}
              </h3>

              {/* QR Bank */}
              <div className="w-44 h-44 bg-stone-50 border border-stone-200 rounded-2xl p-2 mb-3 shadow-inner flex items-center justify-center">
                <img 
                  src={weddingData.groom.bank.qrUrl} 
                  alt="QR Chú Rể" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div className="text-left w-full bg-stone-50 p-3.5 rounded-xl border border-stone-200/90 space-y-1 text-xs text-stone-700 mb-3">
                <p><strong>Ngân hàng:</strong> {weddingData.groom.bank.bankName}</p>
                <p><strong>Chủ tài khoản:</strong> {weddingData.groom.bank.accountHolder}</p>
                <div className="flex items-center justify-between pt-1">
                  <p><strong>Số TK:</strong> {weddingData.groom.bank.accountNumber}</p>
                  <button
                    onClick={() => handleCopy(weddingData.groom.bank.accountNumber, 'groom')}
                    className="flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-100 px-2.5 py-1 rounded-lg border border-amber-300 transition active:scale-95"
                  >
                    {copiedAccount === 'groom' ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" />
                        <span className="text-green-700">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Cô dâu */}
            <div className={`bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-rose-200 flex flex-col items-center ${
              activeBankTab === 'bride' ? 'block' : 'hidden sm:flex'
            }`}>
              <span className="text-[11px] uppercase tracking-wider text-rose-800 font-semibold mb-1">
                MỪNG CƯỚI CÔ DÂU
              </span>
              <h3 className="text-lg font-serif-luxury font-bold text-stone-900 mb-3">
                {weddingData.bride.fullName}
              </h3>

              {/* QR Bank */}
              <div className="w-44 h-44 bg-stone-50 border border-stone-200 rounded-2xl p-2 mb-3 shadow-inner flex items-center justify-center">
                <img 
                  src={weddingData.bride.bank.qrUrl} 
                  alt="QR Cô Dâu" 
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>

              <div className="text-left w-full bg-stone-50 p-3.5 rounded-xl border border-stone-200/90 space-y-1 text-xs text-stone-700 mb-3">
                <p><strong>Ngân hàng:</strong> {weddingData.bride.bank.bankName}</p>
                <p><strong>Chủ tài khoản:</strong> {weddingData.bride.bank.accountHolder}</p>
                <div className="flex items-center justify-between pt-1">
                  <p><strong>Số TK:</strong> {weddingData.bride.bank.accountNumber}</p>
                  <button
                    onClick={() => handleCopy(weddingData.bride.bank.accountNumber, 'bride')}
                    className="flex items-center gap-1 text-[11px] font-semibold text-rose-900 bg-rose-100 px-2.5 py-1 rounded-lg border border-rose-300 transition active:scale-95"
                  >
                    {copiedAccount === 'bride' ? (
                      <>
                        <Check className="w-3 h-3 text-green-600" />
                        <span className="text-green-700">Đã chép</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* XÁC NHẬN THAM DỰ (RSVP) & SỔ LƯU BÚT CHÚC MỪNG */}
      <section className="py-12 sm:py-16 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-rose-700 uppercase tracking-widest text-[11px] font-semibold mb-1">
            XÁC NHẬN & LỜI CHÚC
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-amber-950 mb-2">
            Sổ Lưu Bút Chúc Phúc
          </h2>
          <p className="text-stone-500 text-xs">
            Xin vui lòng phản hồi sớm để gia đình chuẩn bị đón tiếp chu đáo nhất!
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-sm border border-amber-200 mb-8">
          {rsvpSubmitted ? (
            <div className="text-center py-6">
              <div className="w-14 h-14 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-7 h-7 fill-rose-600 text-rose-600 animate-bounce" />
              </div>
              <h3 className="text-xl font-serif-luxury font-bold text-stone-900 mb-1">
                Cảm ơn bạn rất nhiều!
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm max-w-sm mx-auto">
                Phản hồi và lời chúc của bạn đã được gửi tới cô dâu chú rể. Hẹn gặp bạn trong ngày chung vui!
              </p>
              <button
                onClick={() => setRsvpSubmitted(false)}
                className="mt-4 text-xs text-amber-800 underline font-medium"
              >
                Gửi thêm lời chúc khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitRSVP} className="space-y-4">
              <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Tên của bạn *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Ví dụ: Bạn Nam & Người thương"
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-base sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Khả năng tham dự
                  </label>
                  <select
                    value={rsvpAttending}
                    onChange={(e) => setRsvpAttending(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-base sm:text-sm bg-white"
                  >
                    <option value="yes">Chắc chắn tham dự</option>
                    <option value="maybe">Có thể tham dự</option>
                    <option value="no">Tiếc quá, mình bận mất rồi</option>
                  </select>
                </div>
              </div>

              {rsvpAttending === 'yes' && (
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Số người tham dự cùng bạn
                  </label>
                  <select
                    value={rsvpGuestsCount}
                    onChange={(e) => setRsvpGuestsCount(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-base sm:text-sm bg-white"
                  >
                    <option value="1">Đi 1 mình</option>
                    <option value="2">Đi 2 người (với người thương/bạn)</option>
                    <option value="3">Gia đình 3 người</option>
                    <option value="4+">Gia đình 4 người trở lên</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Lời chúc gửi đến dâu rể *
                </label>
                <textarea
                  required
                  rows={3}
                  value={rsvpWishes}
                  onChange={(e) => setRsvpWishes(e.target.value)}
                  placeholder="Gửi gắm lời chúc phúc tốt đẹp nhất..."
                  className="w-full p-3.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-base sm:text-sm"
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 px-8 rounded-full bg-gradient-to-r from-amber-700 to-rose-700 text-white font-semibold text-xs sm:text-sm shadow-md active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Xác Nhận & Lời Chúc</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Danh sách lời chúc đã gửi */}
        <div className="space-y-3">
          <h4 className="text-base font-serif-luxury font-bold text-stone-800 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
            <span>Lời chúc từ khách mời ({wishesList.length})</span>
          </h4>

          <div className="space-y-2.5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-3">
            {wishesList.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white p-3.5 rounded-2xl border border-amber-200/70 shadow-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-stone-900 text-xs sm:text-sm">{item.name}</div>
                  <span className="text-[10px] text-stone-400">{item.time}</span>
                </div>
                {item.relation && (
                  <span className="inline-block text-[10px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {item.relation}
                  </span>
                )}
                <p className="text-xs text-stone-600 leading-relaxed italic">
                  "{item.wishes}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-300 py-10 px-4 text-center border-t border-amber-900/30">
        <div className="max-w-md mx-auto space-y-3">
          <h3 className="font-script text-4xl sm:text-5xl text-amber-200">
            {weddingData.groom.shortName} & {weddingData.bride.shortName}
          </h3>
          <p className="text-[10px] sm:text-xs tracking-widest text-stone-400 uppercase">
            THANK YOU FOR BEING A PART OF OUR SPECIAL DAY
          </p>
          <div className="w-10 h-0.5 bg-amber-600/50 mx-auto" />
          <p className="text-[10px] text-stone-500">
            Designed with love • 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
