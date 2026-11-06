import React, { useState, useEffect } from 'react';
import { WEDDING_DATA } from './data/weddingData';
import InvitationView from './components/InvitationView';
import QrGenerator from './components/QrGenerator';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    const evaluateRoute = () => {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const searchParams = new URLSearchParams(window.location.search);

      // Đường dẫn riêng biệt dành riêng cho bạn tự truy cập:
      // /admin, /tao-thiep, #admin, #tao-thiep hoặc ?admin=true
      const isAdmin = 
        pathname.endsWith('/admin') || 
        pathname.endsWith('/tao-thiep') || 
        hash === '#admin' || 
        hash === '#tao-thiep' ||
        searchParams.get('admin') === 'true';

      setIsAdminPage(isAdmin);
    };

    evaluateRoute();
    window.addEventListener('popstate', evaluateRoute);
    window.addEventListener('hashchange', evaluateRoute);

    return () => {
      window.removeEventListener('popstate', evaluateRoute);
      window.removeEventListener('hashchange', evaluateRoute);
    };
  }, []);

  const handleNavigateToInvitation = (generatedUrl) => {
    // Mở liên kết thiệp mời của khách trong tab mới hoặc chuyển hướng
    window.open(generatedUrl, '_blank');
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Music Player */}
      <AudioPlayer 
        musicUrl={WEDDING_DATA.musicUrl} 
        musicTitle={WEDDING_DATA.musicTitle} 
      />

      {/* 
        Nếu vào đường dẫn riêng (/admin, /tao-thiep, #admin): hiển thị trang Tạo QR & Link.
        Mặc định trang thiệp cưới của khách: KHÔNG hiển thị bất kỳ nút bấm quản trị hay tạo QR nào.
      */}
      {isAdminPage ? (
        <QrGenerator 
          weddingData={WEDDING_DATA} 
          onNavigateToInvitation={handleNavigateToInvitation} 
        />
      ) : (
        <InvitationView 
          weddingData={WEDDING_DATA} 
        />
      )}
    </div>
  );
}
