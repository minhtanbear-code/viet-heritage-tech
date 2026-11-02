"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Compass,
  MapPin,
  QrCode,
  Sparkles,
  Volume2,
  Gift,
  ArrowRight,
  ShieldCheck,
  Play,
  Pause,
  ChevronRight,
  Headphones,
  BookOpen,
  ArrowUpRight,
  Menu,
  X,
  Layers,
  Heart,
  Share2,
  CheckCircle2,
  ExternalLink,
  Info,
  Calendar,
  Send,
  Lock,
} from "lucide-react";
import GoogleHeritageMap from "@/components/GoogleHeritageMap";
import QRScannerModal from "@/components/QRScannerModal";
import CheckpointDetailDrawer from "@/components/CheckpointDetailDrawer";
import WebARShowcase from "@/components/WebARShowcase";
import AIGuideChatbot from "@/components/AIGuideChatbot";
import GamificationHub from "@/components/GamificationHub";
import HostPortalModal from "@/components/HostPortalModal";
import { Checkpoint } from "@/data/checkpoints";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isHostPortalOpen, setIsHostPortalOpen] = useState(false);
  const [selectedCheckpoint, setSelectedCheckpoint] = useState<Checkpoint | null>(null);

  // Trạng thái Form liên hệ
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Hiệu ứng cuộn thanh navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 4000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F5ED] text-[#242823]">
      {/* =========================================================================
          SECTION 1 – HEADER & NAVIGATION (Editorial Minimalism)
      ========================================================================= */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#F8F5ED]/95 backdrop-blur-md shadow-sm border-b border-[#E2DCCF]/80 py-3"
            : "bg-gradient-to-b from-black/70 via-black/30 to-transparent text-white py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo VIETHeritage */}
          <a href="#" className="flex items-center space-x-2.5 group">
            <span
              className={`font-display text-2xl sm:text-3xl font-extrabold tracking-tight transition-colors ${
                isScrolled ? "text-[#263D32]" : "text-white"
              }`}
            >
              VIET<span className="text-[#A64B35]">Heritage</span>
            </span>
            <span
              className={`hidden sm:inline-block text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded border ${
                isScrolled
                  ? "border-[#263D32]/30 text-[#263D32]"
                  : "border-white/30 text-white/90"
              }`}
            >
              Đồng Nai
            </span>
          </a>

          {/* Menu Desktop */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <a
              href="#hero"
              className={`hover:text-[#A64B35] transition-colors ${
                isScrolled ? "text-[#242823]" : "text-white/90"
              }`}
            >
              Trang chủ
            </a>
            <a
              href="#cau-chuyen"
              className={`hover:text-[#A64B35] transition-colors ${
                isScrolled ? "text-[#242823]" : "text-white/90"
              }`}
            >
              Câu chuyện di sản
            </a>
            <a
              href="#gia-tri-van-hoa"
              className={`hover:text-[#A64B35] transition-colors ${
                isScrolled ? "text-[#242823]" : "text-white/90"
              }`}
            >
              Văn hóa người Mạ
            </a>
            <a
              href="#ban-do"
              className={`hover:text-[#A64B35] transition-colors ${
                isScrolled ? "text-[#242823]" : "text-white/90"
              }`}
            >
              Hành trình khám phá
            </a>
            <a
              href="#cong-nghe"
              className={`hover:text-[#A64B35] transition-colors ${
                isScrolled ? "text-[#242823]" : "text-white/90"
              }`}
            >
              Công nghệ & Di sản
            </a>
            <a
              href="#dong-hanh"
              className={`hover:text-[#A64B35] transition-colors ${
                isScrolled ? "text-[#242823]" : "text-white/90"
              }`}
            >
              Gìn giữ di sản
            </a>
          </nav>

          {/* Hành động Header */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsQRModalOpen(true)}
              className="hidden sm:flex items-center space-x-2 text-xs uppercase font-bold tracking-wider px-4 py-2.5 rounded-full border border-[#A64B35] text-[#A64B35] hover:bg-[#A64B35] hover:text-white transition-all duration-200"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Quét QR Thực Địa</span>
            </button>

            <a
              href="#dong-hanh"
              className="bg-[#263D32] hover:bg-[#1A2B23] text-[#F8F5ED] text-xs uppercase font-bold tracking-wider px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all"
            >
              Khám phá di sản
            </a>

            {/* Nút Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg ${
                isScrolled ? "text-[#242823]" : "text-white"
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Drawer Menu Mobile */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F8F5ED] text-[#242823] px-6 py-6 border-b border-[#E2DCCF] space-y-4 animate-fadeIn">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-medium py-1.5 hover:text-[#A64B35]"
            >
              Trang chủ
            </a>
            <a
              href="#cau-chuyen"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-medium py-1.5 hover:text-[#A64B35]"
            >
              Câu chuyện di sản
            </a>
            <a
              href="#gia-tri-van-hoa"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-medium py-1.5 hover:text-[#A64B35]"
            >
              Văn hóa người Mạ
            </a>
            <a
              href="#ban-do"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-medium py-1.5 hover:text-[#A64B35]"
            >
              Hành trình khám phá
            </a>
            <a
              href="#cong-nghe"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-medium py-1.5 hover:text-[#A64B35]"
            >
              Công nghệ & Di sản
            </a>
            <a
              href="#dong-hanh"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-medium py-1.5 hover:text-[#A64B35]"
            >
              Gìn giữ di sản
            </a>
            <div className="pt-2 flex flex-col space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsQRModalOpen(true);
                }}
                className="w-full text-center py-2.5 rounded-full border border-[#A64B35] text-[#A64B35] font-bold text-xs uppercase"
              >
                Quét QR Thực Địa
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsHostPortalOpen(true);
                }}
                className="w-full text-center py-2.5 rounded-full bg-[#E8D8B8] text-[#263D32] font-bold text-xs uppercase"
              >
                Cổng Dành Cho Chủ Homestay
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          SECTION 1 – HERO (Cinematic & Deep Heritage)
      ========================================================================= */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#263D32]"
      >
        {/* Video hoặc Background đại ngàn */}
        <div className="absolute inset-0 z-0">
          <video
            src="/intro_lang_ma.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-45 scale-105"
          />
          {/* Overlay xanh rừng tối nhẹ để tăng tương phản */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#263D32] via-[#263D32]/60 to-black/50" />
        </div>

        {/* Nội dung Hero */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center pt-24 pb-16 space-y-8">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#E8D8B8] text-xs font-semibold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A64B35]"></span>
            <span>DI SẢN VĂN HÓA · ĐỒNG NAI, VIỆT NAM</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Một di sản sống. <br />
            <span className="italic font-normal text-[#E8D8B8]">Ngàn câu chuyện</span> tiếp nối.
          </h1>

          <p className="text-base sm:text-xl text-[#F8F5ED]/85 font-light max-w-2xl mx-auto leading-relaxed">
            Khám phá những giá trị văn hóa của cộng đồng người Mạ và cùng viết tiếp hành trình gìn giữ bản sắc qua các thế hệ.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#cau-chuyen"
              className="w-full sm:w-auto bg-[#A64B35] hover:bg-[#8e3c29] text-white px-8 py-4 rounded-full font-semibold text-sm tracking-wide shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Khám phá câu chuyện</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#gia-tri-van-hoa"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-sm tracking-wide transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Bắt đầu hành trình</span>
            </a>
          </div>

          {/* Dấu ấn số hóa */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/15 max-w-3xl mx-auto text-left">
            <div>
              <div className="font-display text-2xl font-bold text-[#E8D8B8]">Làng Mạ</div>
              <div className="text-xs text-white/70 mt-0.5">Xã Tà Lài, Đồng Nai</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[#E8D8B8]">Vườn Quốc Gia</div>
              <div className="text-xs text-white/70 mt-0.5">Sinh quyển Cát Tiên</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[#E8D8B8]">100% Thực Địa</div>
              <div className="text-xs text-white/70 mt-0.5">Tư liệu đã thẩm định</div>
            </div>
            <div>
              <div className="font-display text-2xl font-bold text-[#E8D8B8]">WebAR & AI</div>
              <div className="text-xs text-white/70 mt-0.5">Trải nghiệm không tải app</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2 – CÂU CHUYỆN DI SẢN (Asymmetric Editorial Layout)
      ========================================================================= */}
      <section id="cau-chuyen" className="py-24 sm:py-32 bg-[#F8F5ED]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Cột trái: Nội dung câu chuyện */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block text-[#A64B35] font-bold text-xs uppercase tracking-widest">
                Ký ức & Thời gian
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263D32] leading-tight">
                Văn hóa không chỉ thuộc về quá khứ.
              </h2>

              <div className="w-16 h-0.5 bg-[#A64B35]"></div>

              <p className="text-base sm:text-lg text-[#242823]/80 leading-relaxed font-light">
                Bên dòng sông Đồng Nai êm đềm và rìa rừng nguyên sinh Cát Tiên, cộng đồng người Mạ tại Tà Lài đã bao đời gắn kết vận mệnh cùng cây rừng, suối nguồn. 
                Văn hóa của họ không phải là những hiện vật nằm bất động sau lớp kính bảo tàng, mà là một thực thể sống – biểu hiện qua nhịp khung cửi, âm vang của bộ chiêng sáu và nếp nhà dài mu rùa che chở nhiều thế hệ.
              </p>

              <p className="text-sm sm:text-base text-[#575D56] leading-relaxed">
                Khi nhịp sống hiện đại cuốn trôi nhiều giá trị truyền thống, những tri thức dân gian ấy đứng trước nguy cơ bị quên lãng. VIETHeritage ra đời không để hoài niệm quá khứ, mà để trân trọng từng mảnh ký ức, ghi chép chân thực và trao lại cho người trẻ chiếc chìa khóa tiếp nối văn hóa bằng chính ngôn ngữ của kỷ nguyên số.
              </p>

              {/* Trích dẫn có xác thực */}
              <blockquote className="border-l-2 border-[#A64B35] pl-4 italic text-[#263D32] font-display text-lg my-6">
                “Mỗi tấm vải dệt ra là một bài ca của rừng. Chỉ cần còn người ngồi bên khung cửi, linh hồn của đại ngàn vẫn còn đó.”
                <span className="block not-italic text-xs font-editorial font-bold text-[#A64B35] mt-2">
                  — Nghệ nhân Dệt Ka Bào (Làng Mạ, Tà Lài)
                </span>
              </blockquote>

              <div className="pt-2">
                <a
                  href="#gia-tri-van-hoa"
                  className="inline-flex items-center space-x-2 text-sm font-bold text-[#263D32] hover:text-[#A64B35] transition-colors group"
                >
                  <span className="border-b border-[#263D32] group-hover:border-[#A64B35]">
                    Tìm hiểu câu chuyện
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Cột phải: Bố cục hình ảnh Editorial bất đối xứng */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-[#E2DCCF]">
                <img
                  src="/tho_cam_mau.jpg"
                  alt="Họa tiết thổ cẩm người Mạ"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-white/40 text-xs text-[#242823]">
                  <span className="font-bold text-[#A64B35] block">Tư liệu thực địa:</span>
                  Họa tiết xếp ly quạt xòe và hoa văn hình học cổ truyền được người Mạ gìn giữ qua nhiều thế hệ.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-xl overflow-hidden aspect-square border border-[#E2DCCF]">
                  <img
                    src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=600&q=80"
                    alt="Kiến trúc nhà dài mu rùa"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                    <span className="text-white text-xs font-semibold">Nhà Dài Mái Mu Rùa</span>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden aspect-square border border-[#E2DCCF]">
                  <img
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80"
                    alt="Không gian cồng chiêng"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                    <span className="text-white text-xs font-semibold">Không Gian Cồng Chiêng</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3 – KHÁM PHÁ CÁC GIÁ TRỊ VĂN HÓA (4 Thẻ Có Chiều Sâu Xác Thực)
      ========================================================================= */}
      <section id="gia-tri-van-hoa" className="py-24 bg-[#E8D8B8]/30 border-y border-[#E2DCCF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#A64B35] font-bold text-xs uppercase tracking-widest">
              Khám Phá Bản Sắc
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263D32]">
              Bốn Trụ Cột Di Sản Người Mạ
            </h2>
            <p className="text-sm sm:text-base text-[#575D56] font-light max-w-2xl mx-auto">
              Chỉ chọn lọc những thực hành văn hóa đã có tư liệu ghi chép xác thực, tôn trọng tính khách quan học thuật và quyền tự quyết của cộng đồng bản địa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1: Nghệ thuật & Hoa văn */}
            <div className="group bg-[#F8F5ED] rounded-2xl overflow-hidden border border-[#E2DCCF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="/tho_cam_mau.jpg"
                    alt="Nghệ thuật và hoa văn"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#263D32]/85 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                    Thủ Công & Mỹ Thuật
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display text-xl font-bold text-[#263D32] group-hover:text-[#A64B35] transition-colors">
                    Nghệ thuật & Hoa văn
                  </h3>
                  <p className="text-xs sm:text-sm text-[#575D56] leading-relaxed">
                    Kỹ thuật dệt thổ cẩm bằng khung thắt lưng độc đáo. Các mô-típ hình học, quả trám, chim thú và sóng nước được tạo nên từ sợi nhuộm vỏ cây rừng tự nhiên.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href="#ar-3d-section"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#A64B35] hover:text-[#263D32] transition-colors"
                >
                  <span>Khám phá WebAR 3D</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card 2: Tri thức bản địa */}
            <div className="group bg-[#F8F5ED] rounded-2xl overflow-hidden border border-[#E2DCCF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=600&q=80"
                    alt="Tri thức bản địa"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#263D32]/85 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                    Môi Trường & Rừng
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display text-xl font-bold text-[#263D32] group-hover:text-[#A64B35] transition-colors">
                    Tri thức bản địa
                  </h3>
                  <p className="text-xs sm:text-sm text-[#575D56] leading-relaxed">
                    Kinh nghiệm truyền khẩu về cây thuốc nam, chu kỳ mùa màng theo trăng, kỹ thuật đan gùi mây và quan niệm bảo vệ rừng đầu nguồn Cát Tiên.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href="#cau-chuyen"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#A64B35] hover:text-[#263D32] transition-colors"
                >
                  <span>Xem tư liệu</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card 3: Âm nhạc & Diễn xướng */}
            <div className="group bg-[#F8F5ED] rounded-2xl overflow-hidden border border-[#E2DCCF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80"
                    alt="Âm nhạc và diễn xướng"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#263D32]/85 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                    Âm Thanh & Tín Ngưỡng
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display text-xl font-bold text-[#263D32] group-hover:text-[#A64B35] transition-colors">
                    Âm nhạc & Diễn xướng
                  </h3>
                  <p className="text-xs sm:text-sm text-[#575D56] leading-relaxed">
                    Hệ thống cồng chiêng sáu chiếc tượng trưng cho các thế hệ gia đình, cùng các làn điệu dân ca Tăm pơt tự sự trữ tình trong lễ hội mừng lúa mới.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href="#ar-3d-section"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#A64B35] hover:text-[#263D32] transition-colors"
                >
                  <span>Nghe âm thanh</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Card 4: Đời sống cộng đồng */}
            <div className="group bg-[#F8F5ED] rounded-2xl overflow-hidden border border-[#E2DCCF] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=600&q=80"
                    alt="Đời sống cộng đồng"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#263D32]/85 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full">
                    Không Gian Cư Trú
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="font-display text-xl font-bold text-[#263D32] group-hover:text-[#A64B35] transition-colors">
                    Đời sống cộng đồng
                  </h3>
                  <p className="text-xs sm:text-sm text-[#575D56] leading-relaxed">
                    Kiến trúc nhà dài mái mu rùa nơi các thế hệ quây quần bên bếp lửa chung; tập tục ẩm thực cơm lam, canh bồi và mô hình du lịch sinh thái cộng đồng Tà Lài.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href="#ban-do"
                  className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#A64B35] hover:text-[#263D32] transition-colors"
                >
                  <span>Đến trải nghiệm</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4 – BẢN ĐỒ DI SẢN (Interactive Wayfinding & Google Maps)
      ========================================================================= */}
      <section id="ban-do" className="py-24 bg-[#F8F5ED]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2DCCF] pb-6">
            <div className="space-y-2">
              <span className="text-[#A64B35] font-bold text-xs uppercase tracking-widest">
                Định Vị Không Gian
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#263D32]">
                Bản Đồ Di Sản Làng Mạ – Tà Lài
              </h2>
              <p className="text-sm text-[#575D56] max-w-xl">
                Tất cả điểm đến đã được nhóm khảo sát thực tế tại Huyện Tân Phú, Tỉnh Đồng Nai. Kết hợp mốc nhận diện hình ảnh để du khách không lạc đường giữa đại ngàn.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="bg-[#263D32] hover:bg-[#1A2B23] text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center space-x-1.5 shadow"
              >
                <QrCode className="w-3.5 h-3.5 text-[#E8D8B8]" />
                <span>Mở Camera Quét QR</span>
              </button>
            </div>
          </div>

          {/* Component Bản đồ Google Maps đã kiểm thử */}
          <GoogleHeritageMap
            onSelectCheckpoint={(cp) => setSelectedCheckpoint(cp)}
            selectedCheckpointId={selectedCheckpoint?.id}
          />
        </div>
      </section>

      {/* =========================================================================
          SECTION 5 – DI SẢN QUA LỜI KỂ & WEBAR 3D (Digital Cultural Magazine)
      ========================================================================= */}
      <WebARShowcase />

      {/* =========================================================================
          SECTION 6 – CÔNG NGHỆ ĐỒNG HÀNH CÙNG DI SẢN (AI Guide & Gamification)
      ========================================================================= */}
      <section id="cong-nghe" className="py-24 bg-[#E8D8B8]/20 border-y border-[#E2DCCF]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-[#A64B35] font-bold text-xs uppercase tracking-widest">
              Đổi Mới Sáng Tạo
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263D32]">
              Công Nghệ Số Đồng Hành Cùng Di Sản
            </h2>
            <p className="text-sm sm:text-base text-[#575D56] font-light max-w-2xl mx-auto">
              Công nghệ không thay thế thực tại mà là chiếc kính lúp giúp thế hệ trẻ chạm sâu vào tầng ý nghĩa của văn hóa bản địa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Trợ lý AI Guide */}
            <div className="lg:col-span-6 space-y-3">
              <AIGuideChatbot />
            </div>

            {/* Thử thách Gamification */}
            <div className="lg:col-span-6 space-y-3">
              <GamificationHub />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7 – CÙNG GÌN GIỮ DI SẢN (Forest CTA & Liên Hệ)
      ========================================================================= */}
      <section id="dong-hanh" className="relative py-24 sm:py-32 bg-[#263D32] text-white overflow-hidden">
        {/* Họa tiết kỷ hà mờ nền */}
        <div className="absolute inset-0 pattern-dots opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <span className="inline-block text-[#E8D8B8] font-bold text-xs uppercase tracking-widest px-3.5 py-1 rounded-full bg-white/10 border border-white/20">
              Đồng Hành & Lan Tỏa
            </span>

            <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Tương lai của di sản bắt đầu từ hôm nay.
            </h2>

            <p className="text-base sm:text-lg text-[#F8F5ED]/80 font-light leading-relaxed">
              Mỗi câu chuyện được lắng nghe, mỗi giá trị được ghi nhận và mỗi thế hệ cùng tham gia đều góp phần giữ gìn bản sắc văn hóa. 
              Hãy cùng VIETHeritage chung tay vì một di sản sống bền vững.
            </p>
          </div>

          {/* Form Liên Hệ & Đề Xuất Hợp Tác */}
          <div className="mt-12 bg-white rounded-3xl p-8 sm:p-10 shadow-2xl text-[#242823] max-w-2xl mx-auto border border-[#E2DCCF]">
            {formSubmitted ? (
              <div className="text-center py-8 space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-14 h-14 text-[#263D32] mx-auto animate-bounce" />
                <h3 className="font-display text-2xl font-bold text-[#263D32]">
                  Cảm ơn sự đồng hành của bạn!
                </h3>
                <p className="text-sm text-[#575D56] max-w-md mx-auto">
                  Đội ngũ dự án VIETHeritage (Viet Nova) đã nhận được thông tin và sẽ phản hồi đến bạn qua email trong vòng 24 giờ.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#263D32] uppercase tracking-wider mb-1.5">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full bg-[#F8F5ED] text-[#242823] text-sm px-4 py-3 rounded-xl border border-[#E2DCCF] focus:outline-none focus:ring-2 focus:ring-[#263D32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#263D32] uppercase tracking-wider mb-1.5">
                      Địa chỉ Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="email@vidu.com"
                      className="w-full bg-[#F8F5ED] text-[#242823] text-sm px-4 py-3 rounded-xl border border-[#E2DCCF] focus:outline-none focus:ring-2 focus:ring-[#263D32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#263D32] uppercase tracking-wider mb-1.5">
                    Nội dung đề xuất / Quan tâm
                  </label>
                  <textarea
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Bạn muốn tham gia tour trải nghiệm, đề xuất số hóa di sản, hay hợp tác nghiên cứu..."
                    className="w-full bg-[#F8F5ED] text-[#242823] text-sm px-4 py-3 rounded-xl border border-[#E2DCCF] focus:outline-none focus:ring-2 focus:ring-[#263D32]"
                  ></textarea>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-[#575D56] flex items-center space-x-1">
                    <Lock className="w-3 h-3 text-[#A64B35]" />
                    <span>Cam kết bảo mật thông tin cá nhân theo quy định.</span>
                  </span>

                  <button
                    type="submit"
                    className="bg-[#A64B35] hover:bg-[#8e3c29] text-white px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow hover:shadow-lg transition-all"
                  >
                    Gửi đề xuất
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8 – FOOTER (Minh Bạch & Tôn Trọng Bản Quyền)
      ========================================================================= */}
      <footer className="bg-[#1A2B23] text-[#F8F5ED]/80 py-16 border-t border-white/10 text-xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Cột 1: Logo & Sứ mệnh */}
            <div className="space-y-4 md:col-span-1">
              <span className="font-display text-2xl font-bold text-white block">
                VIET<span className="text-[#A64B35]">Heritage</span>
              </span>
              <p className="text-white/70 leading-relaxed font-light">
                Dự án nghiên cứu và đổi mới sáng tạo ứng dụng công nghệ số trong bảo tồn, lưu giữ và quảng bá di sản người Mạ tại Đồng Nai.
              </p>
              <div className="text-[11px] text-[#E8D8B8]">
                Đơn vị thực hiện: <strong>Đội Viet Nova — ĐH Nguyễn Tất Thành</strong>
              </div>
            </div>

            {/* Cột 2: Điều hướng nhanh */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">Điều hướng</h4>
              <ul className="space-y-2">
                <li><a href="#hero" className="hover:text-white transition-colors">Trang chủ</a></li>
                <li><a href="#cau-chuyen" className="hover:text-white transition-colors">Câu chuyện di sản</a></li>
                <li><a href="#gia-tri-van-hoa" className="hover:text-white transition-colors">Văn hóa người Mạ</a></li>
                <li><a href="#ban-do" className="hover:text-white transition-colors">Bản đồ thực địa</a></li>
                <li><a href="#cong-nghe" className="hover:text-white transition-colors">Công nghệ WebAR & AI</a></li>
              </ul>
            </div>

            {/* Cột 3: Điểm chạm thực địa */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">Điểm chạm thực địa</h4>
              <p className="text-white/70">
                📍 Làng Mạ, Xã Tà Lài, Huyện Tân Phú, Tỉnh Đồng Nai, Việt Nam.
              </p>
              <p className="text-white/70">
                🌲 Vùng đệm Vườn Quốc gia Cát Tiên.
              </p>
              <p className="text-[#E8D8B8]">
                🤝 Đồng hành cùng Nghệ nhân Ka Bào & Ban quản lý Du lịch Cộng đồng Tà Lài.
              </p>
            </div>

            {/* Cột 4: Liên hệ & Đạo đức */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider text-xs">Thông tin liên hệ</h4>
              <p>📧 Email: <a href="mailto:minhtanbear@gmail.com" className="text-[#E8D8B8] hover:underline">minhtanbear@gmail.com</a></p>
              <p>📞 Hotline: 0931.561.388</p>
              <div className="pt-2 text-[11px] text-white/50">
                Mọi hình ảnh và tư liệu văn hóa đều được ghi chép thực tế có sự đồng thuận của cộng đồng (FPIC).
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-white/50 text-[11px] gap-4">
            <p>© 2026 VIETHeritage. Bản quyền thuộc về Đội thi Viet Nova – ĐH Nguyễn Tất Thành.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">Chính sách quyền riêng tư</a>
              <a href="#" className="hover:text-white transition-colors">Nguồn tư liệu & Bản quyền hình ảnh</a>
            </div>
          </div>
        </div>
      </footer>

      {/* MODAL TRÌNH QUÉT QR THỰC ĐỊA */}
      <QRScannerModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        onDetectCheckpoint={(cp) => setSelectedCheckpoint(cp)}
      />

      {/* MODAL CỔNG CHỦ HOMESTAY */}
      <HostPortalModal
        isOpen={isHostPortalOpen}
        onClose={() => setIsHostPortalOpen(false)}
      />

      {/* DRAWER CHI TIẾT ĐIỂM CHẠM & AUDIO GUIDE */}
      <CheckpointDetailDrawer
        checkpoint={selectedCheckpoint}
        onClose={() => setSelectedCheckpoint(null)}
      />
    </div>
  );
}
