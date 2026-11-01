"use client";

import React, { useState, useEffect } from "react";
import {
  Sun,
  Compass,
  MapPin,
  QrCode,
  Sparkles,
  Volume2,
  Gift,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Play,
  Box,
  Bot,
  Store,
} from "lucide-react";
import GoogleHeritageMap from "@/components/GoogleHeritageMap";
import QRScannerModal from "@/components/QRScannerModal";
import CheckpointDetailDrawer from "@/components/CheckpointDetailDrawer";
import WebARShowcase from "@/components/WebARShowcase";
import AIGuideChatbot from "@/components/AIGuideChatbot";
import GamificationHub from "@/components/GamificationHub";
import HostPortalModal from "@/components/HostPortalModal";
import { Checkpoint, TA_LAI_CHECKPOINTS } from "@/data/checkpoints";

export default function HomePage() {
  const [outdoorMode, setOutdoorMode] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isHostPortalOpen, setIsHostPortalOpen] = useState(false);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<Checkpoint | null>(null);

  useEffect(() => {
    if (outdoorMode) {
      document.body.classList.add("outdoor-mode");
    } else {
      document.body.classList.remove("outdoor-mode");
    }
  }, [outdoorMode]);

  const handleSelectCheckpoint = (cp: Checkpoint) => {
    setSelectedCheckpoint(cp);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 🧭 THANH ĐIỀU HƯỚNG */}
      <header className="sticky top-0 z-40 bg-[#fbf9f5]/90 backdrop-blur-md border-b border-stone-200 outdoor-card transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-amber-900 flex items-center justify-center text-amber-200 font-bold text-xl shadow-md">
              VH
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-stone-900 block leading-tight outdoor-text">
                VIET HERITAGE TECH
              </span>
              <span className="text-[11px] font-medium text-emerald-800 tracking-wider uppercase block">
                Làng Mạ • Tà Lài • Cát Tiên
              </span>
            </div>
          </div>

          {/* Menu */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-stone-700">
            <a href="#ar-3d-section" className="hover:text-emerald-800 transition-colors flex items-center space-x-1">
              <Box className="w-4 h-4 text-amber-600" />
              <span>Không gian 3D</span>
            </a>
            <a href="#map-section" className="hover:text-emerald-800 transition-colors flex items-center space-x-1">
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Bản đồ Google</span>
            </a>
            <a href="#ai-guide-section" className="hover:text-emerald-800 transition-colors flex items-center space-x-1">
              <Bot className="w-4 h-4 text-sky-600" />
              <span>Trợ lý AI Guide</span>
            </a>
            <a href="#gamification-section" className="hover:text-emerald-800 transition-colors flex items-center space-x-1">
              <Gift className="w-4 h-4 text-rose-600" />
              <span>Đổi Voucher</span>
            </a>
          </nav>

          {/* Công cụ: Bật Chế độ Ngoài trời, Cổng Chủ nhà & Nút Quét QR */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Nút Cổng Chủ Nhà 1-Chạm */}
            <button
              onClick={() => setIsHostPortalOpen(true)}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 px-3 py-1.5 rounded-full text-xs font-black flex items-center space-x-1 transition-all"
              title="Dành cho chủ homestay & quầy lưu niệm Làng Mạ kiểm tra voucher"
            >
              <Store className="w-3.5 h-3.5 text-amber-800" />
              <span className="hidden sm:inline">Cổng Chủ Nhà</span>
            </button>

            {/* Chế độ ngoài trời */}
            <button
              onClick={() => setOutdoorMode(!outdoorMode)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                outdoorMode
                  ? "bg-amber-400 text-stone-950 ring-2 ring-stone-900"
                  : "bg-stone-200/80 hover:bg-stone-300 text-stone-700"
              }`}
              title="Chế độ ngoài trời: Tăng tương phản chống lóa nắng"
            >
              <Sun className={`w-3.5 h-3.5 ${outdoorMode ? "text-stone-900 animate-spin" : ""}`} />
              <span className="hidden sm:inline">{outdoorMode ? "Chế độ Ngoài trời: BẬT" : "Chế độ Ngoài trời"}</span>
            </button>

            {/* Quét QR */}
            <button
              onClick={() => setIsQRModalOpen(true)}
              className="bg-emerald-800 hover:bg-emerald-900 text-amber-100 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 shadow-md hover:shadow-lg transition-all outdoor-btn"
            >
              <QrCode className="w-4 h-4" />
              <span>Quét QR</span>
            </button>
          </div>
        </div>
      </header>

      {/* 🏞️ HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fbf9f5] via-amber-50/30 to-[#fbf9f5] py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Cột trái */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>Giải pháp Khởi nghiệp ĐH Nguyễn Tất Thành (Viet Nova)</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-950 tracking-tight leading-[1.15] outdoor-text">
                Chạm vào <span className="text-emerald-800 underline decoration-amber-600 decoration-wavy decoration-2">Linh hồn Đại ngàn</span> qua Công nghệ Di sản Số
              </h1>

              <p className="text-base text-stone-700 font-medium leading-relaxed max-w-2xl">
                Nền tảng du lịch văn hóa thông minh tiên phong tại <strong>Làng Mạ (Tà Lài, VQG Cát Tiên)</strong>. 
                Bình dân hóa công nghệ WebAR, Audio Guide và Trợ lý AI để biến mỗi bước chân tự túc thành hành trình khám phá di sản sống động mà không cần tải app.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#ai-guide-section"
                  className="bg-emerald-800 hover:bg-emerald-900 text-amber-50 px-6 py-3 rounded-xl font-bold text-sm sm:text-base flex items-center space-x-2 shadow-lg transition-all outdoor-btn"
                >
                  <Bot className="w-5 h-5 text-amber-300" />
                  <span>Hỏi Trợ Lý AI Guide</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>

                <a
                  href="#gamification-section"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-black px-5 py-3 rounded-xl text-sm sm:text-base flex items-center space-x-2 transition-all shadow"
                >
                  <Gift className="w-4 h-4" />
                  <span>Thử Thách Nhận Quà</span>
                </a>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-200">
                <div className="flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 outdoor-text">Thẩm định Văn hóa</h4>
                    <p className="text-[11px] text-stone-600">Đồng hành cùng Già làng & Nghệ nhân Mạ</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Volume2 className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 outdoor-text">Audio-First UX</h4>
                    <p className="text-[11px] text-stone-600">Nâng tầm mắt, lắng nghe đại ngàn</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Gift className="w-4 h-4 text-rose-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 outdoor-text">Chia sẻ Lợi ích</h4>
                    <p className="text-[11px] text-stone-600">10% doanh thu vào Quỹ Làng Mạ</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột phải: Video Intro */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-stone-900/10 bg-stone-900 aspect-video lg:aspect-[4/5] outdoor-card">
                <video
                  src="/intro_lang_ma.mp4"
                  controls
                  playsInline
                  autoPlay={false}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-amber-200 flex items-center space-x-1.5 border border-stone-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Di sản Sống Làng Mạ • Tà Lài</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🔮 PHÂN HỆ WEBAR 3D TỪ ẢNH DỆT THẬT (BƯỚC 3) */}
      <WebARShowcase />

      {/* 🤖 PHÂN HỆ BƯỚC 4: AI GUIDE RAG & GAMIFICATION NHẬN VOUCHER */}
      <section id="ai-guide-section" className="py-16 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black tracking-wider text-sky-800 uppercase bg-sky-100 border border-sky-300 px-3.5 py-1 rounded-full">
              Bước 4: Trí Tuệ Nhân Tạo & Kinh Tế Bản Địa
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 outdoor-text">
              Trợ Lý AI Văn Hóa & Thử Thách Đổi Quà Thực Địa
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
              Tương tác thông minh 24/7 với Trợ lý AI có cơ chế RAG chống bịa đặt lịch sử, kết hợp trò chơi thực địa đổi voucher lưu trú và vòng thổ cẩm lưu niệm.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cột trái: Trợ lý AI Chatbot */}
            <div className="lg:col-span-6 space-y-3">
              <AIGuideChatbot />
            </div>

            {/* Cột phải: Gamification Hub & Đổi Voucher */}
            <div id="gamification-section" className="lg:col-span-6 space-y-3">
              <GamificationHub />
            </div>
          </div>
        </div>
      </section>

      {/* 🗺️ BẢN ĐỒ GOOGLE MAPS LÀNG MẠ - ĐỒNG NAI (BƯỚC 2) */}
      <section id="map-section" className="py-14 bg-[#fbf9f5] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-black tracking-wider text-emerald-800 uppercase bg-emerald-100 px-3 py-1 rounded-full">
                Google Maps Trực Địa (Đồng Nai)
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2 outdoor-text">
                Bản đồ Google Di sản Làng Mạ – Tà Lài
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                Được đồng bộ trực tiếp với <strong>Google Maps (Ảnh Vệ Tinh đại ngàn & Đường Bộ)</strong>, kết hợp mốc nhận diện hình ảnh giúp du khách dễ dàng tìm đến từng nhà sàn và xưởng dệt.
              </p>
            </div>

            <button
              onClick={() => setIsQRModalOpen(true)}
              className="self-start md:self-auto bg-amber-500 hover:bg-amber-400 text-stone-950 font-black px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center space-x-1.5 shadow"
            >
              <QrCode className="w-4 h-4" />
              <span>Mở Camera Quét QR</span>
            </button>
          </div>

          <GoogleHeritageMap
            onSelectCheckpoint={handleSelectCheckpoint}
            selectedCheckpointId={selectedCheckpoint?.id}
          />
        </div>
      </section>

      {/* 📊 BỘ SỐ ẤN TƯỢNG */}
      <section className="bg-stone-900 text-stone-100 py-10 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-stone-800/40 border border-stone-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-400">4.5 / 5</div>
              <div className="text-xs sm:text-sm text-stone-300 mt-1">Mức độ hài lòng thử nghiệm (72 mẫu)</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-800/40 border border-stone-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400">92.5%</div>
              <div className="text-xs sm:text-sm text-stone-300 mt-1">Du khách sẵn sàng quét QR nghe Audio</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-800/40 border border-stone-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-rose-400">&lt; 1.5 MB</div>
              <div className="text-xs sm:text-sm text-stone-300 mt-1">Mô hình 3D nén Draco siêu nhẹ</div>
            </div>

            <div className="p-4 rounded-xl bg-stone-800/40 border border-stone-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-sky-400">0 VNĐ</div>
              <div className="text-xs sm:text-sm text-stone-300 mt-1">Không cần tải app, chạy ngay trên Web</div>
            </div>
          </div>
        </div>
      </section>

      {/* 👣 FOOTER */}
      <footer className="mt-auto bg-stone-900 text-stone-300 py-10 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-amber-600 flex items-center justify-center text-white font-bold text-xs">
                  VH
                </div>
                <span className="font-bold text-stone-100 tracking-wider text-sm">VIET HERITAGE TECH</span>
              </div>
              <p className="text-stone-400 leading-relaxed">
                Dự án khởi nghiệp đổi mới sáng tạo sinh viên thuộc Trường Đại học Nguyễn Tất Thành (Đội Viet Nova).
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-stone-100 uppercase tracking-wider mb-2">Điểm chạm Tiên phong</h4>
              <p>📍 Làng Mạ, Xã Tà Lài, Huyện Tân Phú, Tỉnh Đồng Nai</p>
              <p>🌲 Vùng đệm Vườn Quốc gia Cát Tiên</p>
              <p>🤝 Hợp tác cùng Nghệ nhân Dệt Ka Bào</p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-stone-100 uppercase tracking-wider mb-2">Liên hệ Dự án</h4>
              <p>📧 Email: minhtanbear@gmail.com</p>
              <p>📞 Hotline: 0931.561.388</p>
              <p className="text-amber-400 font-semibold pt-1">
                © 2026 Viet Heritage Tech. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* 📱 MODAL QUÉT QR */}
      <QRScannerModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onDetectCheckpoint={(cp) => setSelectedCheckpoint(cp)}
      />

      {/* 🏪 MODAL CỔNG CHỦ NHÀ 1-CHẠM */}
      <HostPortalModal
        isOpen={isHostPortalOpen}
        onClose={() => setIsHostPortalOpen(false)}
      />

      {/* 📜 DRAWER THÔNG TIN ĐIỂM CHẠM & AUDIO GUIDE */}
      <CheckpointDetailDrawer
        checkpoint={selectedCheckpoint}
        onClose={() => setSelectedCheckpoint(null)}
      />
    </div>
  );
}
