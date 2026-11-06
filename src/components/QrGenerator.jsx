import React, { useState, useRef, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { 
  QrCode, 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  Sparkles, 
  Users, 
  Eye, 
  Plus, 
  Trash2,
  RefreshCw,
  Share2,
  Globe,
  Settings
} from 'lucide-react';
import InvitationCardPreview from './InvitationCardPreview';

const POPULAR_RELATIONS = [
  'Bạn Chú Rể',
  'Bạn Cô Dâu',
  'Bạn Thân',
  'Bạn Đại Học',
  'Bạn Cấp 3',
  'Đồng Nghiệp Chú Rể',
  'Đồng Nghiệp Cô Dâu',
  'Anh/Chị/Em',
  'Họ Hàng Nhà Trai',
  'Họ Hàng Nhà Gái',
  'Đối Tác & Khách Quý'
];

const PREFIX_OPTIONS = [
  'Trân trọng kính mời',
  'Kính mời',
  'Thân mời',
  'Thương mời'
];

export default function QrGenerator({ weddingData, onNavigateToInvitation }) {
  // Tự động nhận diện: local thì dùng localhost, build/production thì dùng https://namtv95it.github.io/wedding-diep/
  const isLocalEnv = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1'
  );

  const defaultBaseUrl = isLocalEnv 
    ? window.location.origin 
    : 'https://namtv95it.github.io/wedding-diep';

  const [baseUrl, setBaseUrl] = useState(defaultBaseUrl);

  const [guestName, setGuestName] = useState('');
  const [guestPrefix, setGuestPrefix] = useState('Trân trọng kính mời');
  const [guestRelation, setGuestRelation] = useState('Bạn Chú Rể');
  const [customRelation, setCustomRelation] = useState('');
  const [useCustomRelation, setUseCustomRelation] = useState(false);

  const [copiedLink, setCopiedLink] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  
  const cardRef = useRef(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('wedding_guest_history');
    if (saved) {
      try {
        setHistoryList(JSON.parse(saved));
      } catch {
        // ignore
      }
    }
  }, []);

  const handleUpdateBaseUrl = (newUrl) => {
    setBaseUrl(newUrl);
    localStorage.setItem('wedding_base_url', newUrl);
  };

  // Tính quan hệ cuối cùng
  const currentRelation = useCustomRelation ? customRelation.trim() : guestRelation;

  // Xây dựng đường dẫn cá nhân hóa dành cho khách mời (bỏ dấu / ở cuối)
  const generateTargetUrl = (name = guestName, relation = currentRelation, prefix = guestPrefix) => {
    let cleanBase = (baseUrl || defaultBaseUrl).trim();
    // Bỏ tất cả dấu / ở cuối đường dẫn (ví dụ: wedding-diep/ -> wedding-diep)
    cleanBase = cleanBase.replace(/\/+$/, '');

    const params = new URLSearchParams();
    if (name.trim()) params.set('to', name.trim());
    if (relation.trim()) params.set('role', relation.trim());
    if (prefix.trim()) params.set('prefix', prefix.trim());

    const queryString = params.toString();
    if (!queryString) return cleanBase;

    return `${cleanBase}?${queryString}`;
  };

  const targetUrl = generateTargetUrl();

  // Copy link vào clipboard
  const handleCopyLink = (urlToCopy = targetUrl) => {
    navigator.clipboard.writeText(urlToCopy);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Lưu vào lịch sử khách mời
  const saveGuestToHistory = () => {
    if (!guestName.trim()) return;

    const newItem = {
      id: Date.now().toString(),
      name: guestName.trim(),
      prefix: guestPrefix,
      relation: currentRelation,
      url: targetUrl,
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })
    };

    // Tránh trùng lặp cùng URL
    const updated = [newItem, ...historyList.filter(item => item.url !== targetUrl)];
    setHistoryList(updated);
    localStorage.setItem('wedding_guest_history', JSON.stringify(updated));
  };

  // Tải thiệp mời dạng ảnh PNG sắc nét
  const handleDownloadCardImage = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);

    try {
      // Tự động lưu vào lịch sử nếu có tên
      if (guestName.trim()) {
        saveGuestToHistory();
      }

      // Tạo ảnh PNG với độ phân giải cao 2x
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5,
        backgroundColor: '#faf7f2',
      });

      const safeName = (guestName.trim() || 'Thiep-Moi-Cuoi')
        .replace(/[^a-zA-Z0-9\u00C0-\u1EF9]/g, '-')
        .replace(/-+/g, '-');

      const link = document.createElement('a');
      link.download = `Thiep-Moi-${safeName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Lỗi xuất ảnh thiệp mời:', err);
      alert('Không thể tạo ảnh, vui lòng thử lại trên trình duyệt Chrome/Edge!');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDeleteHistoryItem = (id) => {
    const updated = historyList.filter(item => item.id !== id);
    setHistoryList(updated);
    localStorage.setItem('wedding_guest_history', JSON.stringify(updated));
  };

  const handleSelectHistoryItem = (item) => {
    setGuestName(item.name);
    setGuestPrefix(item.prefix || 'Trân trọng kính mời');
    if (POPULAR_RELATIONS.includes(item.relation)) {
      setGuestRelation(item.relation);
      setUseCustomRelation(false);
    } else {
      setCustomRelation(item.relation);
      setUseCustomRelation(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-800 font-body py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header trang tạo */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-amber-200/80 mb-8">
          <div>
            <div className="flex items-center gap-2 text-rose-700 text-xs font-semibold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>CÔNG CỤ DÀNH CHO CÔ DÂU & CHÚ RỂ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-amber-950">
              Tạo Link & Thiệp QR Mời Cưới
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Nhập tên khách mời để tự động sinh đường dẫn cá nhân hóa và tấm thiệp mời chứa mã QR tuyệt đẹp.
            </p>
          </div>

          <button
            onClick={() => {
              const params = new URLSearchParams();
              if (guestName.trim()) params.set('to', guestName.trim());
              if (currentRelation.trim()) params.set('role', currentRelation.trim());
              if (guestPrefix.trim()) params.set('prefix', guestPrefix.trim());
              const queryString = params.toString();
              const localPreviewUrl = queryString 
                ? `${window.location.origin}/?${queryString}`
                : `${window.location.origin}/`;
              window.open(localPreviewUrl, '_blank');
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 text-amber-900 border border-amber-300 shadow-sm text-xs font-medium transition"
          >
            <Eye className="w-4 h-4 text-amber-700" />
            <span>Xem Trước Thử Nghiệm</span>
          </button>
        </div>

        {/* Nội dung chính chia 2 cột: Cột nhập form & Cột Preview thiệp mời QR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CỘT TRÁI: FORM NHẬP THÔNG TIN (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-amber-200/90 space-y-5">
              <h2 className="text-lg font-serif-luxury font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
                <Users className="w-5 h-5 text-amber-700" />
                <span>Thông Tin Khách Mời</span>
              </h2>

              {/* Lời xưng hô */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Cách xưng hô
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PREFIX_OPTIONS.map((prefix) => (
                    <button
                      key={prefix}
                      type="button"
                      onClick={() => setGuestPrefix(prefix)}
                      className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition ${
                        guestPrefix === prefix
                          ? 'bg-amber-100 text-amber-900 border-amber-400 font-semibold'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {prefix}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tên khách mời */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Tên khách mời *
                </label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ví dụ: Anh Nam, Bạn Quỳnh Anh & Người thương..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm font-medium"
                />
              </div>

              {/* Mối quan hệ */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
                    Mối quan hệ
                  </label>
                  <button
                    type="button"
                    onClick={() => setUseCustomRelation(!useCustomRelation)}
                    className="text-[11px] text-amber-800 hover:underline font-medium"
                  >
                    {useCustomRelation ? '← Chọn mẫu có sẵn' : '+ Nhập tùy ý'}
                  </button>
                </div>

                {!useCustomRelation ? (
                  <select
                    value={guestRelation}
                    onChange={(e) => setGuestRelation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm bg-white"
                  >
                    {POPULAR_RELATIONS.map((rel) => (
                      <option key={rel} value={rel}>
                        {rel}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={customRelation}
                    onChange={(e) => setCustomRelation(e.target.value)}
                    placeholder="Ví dụ: Bạn thân chí cốt, Thầy giáo, Sếp cũ..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm"
                  />
                )}
              </div>

              {/* Link sinh tự động */}
              <div className="pt-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                  Đường dẫn thiệp mời cá nhân hóa
                </label>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/90 text-xs font-mono break-all text-stone-600 select-all">
                  {targetUrl}
                </div>
              </div>

              {/* Nhóm nút hành động: Copy link & Thêm vào danh sách */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleCopyLink(targetUrl)}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-medium bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-700 font-semibold">Đã Chép Link</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-800" />
                      <span>Sao Chép Link</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={saveGuestToHistory}
                  disabled={!guestName.trim()}
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 disabled:opacity-40 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Lưu Khách Mời</span>
                </button>
              </div>
            </div>

            {/* BẢNG LỊCH SỬ KHÁCH MỜI ĐÃ TẠO */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-amber-200/90">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <h3 className="text-sm font-serif-luxury font-bold text-stone-900 flex items-center gap-1.5">
                  <span>Khách mời đã tạo ({historyList.length})</span>
                </h3>
                {historyList.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Bạn có chắc muốn xóa toàn bộ danh sách đã lưu?')) {
                        setHistoryList([]);
                        localStorage.removeItem('wedding_guest_history');
                      }
                    }}
                    className="text-[11px] text-stone-400 hover:text-rose-600"
                  >
                    Xóa tất cả
                  </button>
                )}
              </div>

              {historyList.length === 0 ? (
                <p className="text-xs text-stone-400 italic text-center py-4">
                  Chưa có khách mời nào được lưu. Hãy nhập tên ở trên và bấm "Lưu Khách Mời" hoặc "Tải Thiệp"!
                </p>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {historyList.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200 text-xs transition"
                    >
                      <div 
                        onClick={() => handleSelectHistoryItem(item)}
                        className="cursor-pointer flex-1 min-w-0 pr-2"
                        title="Bấm để nạp lại thông tin vào thiệp"
                      >
                        <div className="font-semibold text-stone-800 truncate">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-stone-500 flex items-center gap-2 mt-0.5">
                          <span className="text-amber-800 font-medium">{item.relation}</span>
                          <span>•</span>
                          <span>{item.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleCopyLink(item.url)}
                          className="p-1.5 rounded-lg hover:bg-white text-stone-500 hover:text-amber-800 transition"
                          title="Sao chép link"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteHistoryItem(item.id)}
                          className="p-1.5 rounded-lg hover:bg-white text-stone-400 hover:text-rose-600 transition"
                          title="Xóa"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* CỘT PHẢI: PREVIEW THIỆP MỜI KÈM QR CODE & NÚT DOWNLOAD (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Xem Trước Tấm Thiệp Kèm Mã QR</span>
              </span>

              {/* Nút Tải Ảnh Thiệp Mời */}
              <button
                onClick={handleDownloadCardImage}
                disabled={isDownloading}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-700 via-rose-700 to-amber-800 hover:from-amber-800 hover:to-rose-800 text-white font-medium text-xs shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
              >
                {isDownloading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Đang kết xuất ảnh...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Tải Ảnh Thiệp Mời (PNG)</span>
                  </>
                )}
              </button>
            </div>

            {/* Khung Thiệp Mời Cưới Sang Trọng Được Render Sắc Nét */}
            <div className="w-full p-2 bg-stone-200/50 rounded-3xl border border-stone-300/80 flex justify-center">
              <InvitationCardPreview
                ref={cardRef}
                targetUrl={targetUrl}
                guestName={guestName}
                guestRelation={currentRelation}
                guestPrefix={guestPrefix}
                weddingData={weddingData}
              />
            </div>

            <p className="text-[11px] text-stone-500 text-center mt-3 max-w-md">
              💡 <strong>Mẹo gửi thiệp:</strong> Bấm nút <em>"Tải Ảnh Thiệp Mời (PNG)"</em> ở trên để lưu thiệp về máy và gửi trực tiếp qua Zalo, Messenger, Facebook. Khách mời nhận ảnh chỉ cần mở camera điện thoại quét mã QR là truy cập thẳng vào trang thiệp cưới đầy đủ!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

