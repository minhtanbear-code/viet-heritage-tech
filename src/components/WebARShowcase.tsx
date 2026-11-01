"use client";

import React, { useState, useRef } from "react";
import { HeritageArtifact, SAMPLE_ARTIFACTS } from "@/data/artifacts";
import ModelViewer3D from "./ModelViewer3D";
import Textile3DViewer from "./Textile3DViewer";
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Headphones,
  Info,
  ShieldCheck,
  ChevronRight,
  BookOpen,
  Award,
  Image as ImageIcon,
} from "lucide-react";

export default function WebARShowcase() {
  const [selectedArtifact, setSelectedArtifact] = useState<HeritageArtifact>(SAMPLE_ARTIFACTS[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play();
      setIsPlayingAudio(true);
    }
  };

  return (
    <section id="ar-3d-section" className="py-16 bg-[#fbf9f5] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Tiêu đề phân hệ 3D & WebAR */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-black tracking-wider text-amber-800 uppercase bg-amber-100 border border-amber-300 px-3.5 py-1 rounded-full">
            Bước 3: Không Gian WebAR 3D & Audio Thuyết Minh
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 outdoor-text">
            Số Hóa 3D Sống Động Từ Hoa Văn Dệt Thổ Cẩm
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Áp dụng công nghệ dựng hình WebGL & WebAR 3D trực tiếp từ mẫu ảnh dệt thổ cẩm truyền thống của bà con. 
            Xoay 360 độ, chiêm ngưỡng từng nếp gấp xòe quạt và nghe thuyết minh tự động.
          </p>
        </div>

        {/* Thanh chọn nhanh các hiện vật */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {SAMPLE_ARTIFACTS.map((artifact) => {
            const isSelected = artifact.id === selectedArtifact.id;
            return (
              <button
                key={artifact.id}
                onClick={() => {
                  setSelectedArtifact(artifact);
                  setIsPlayingAudio(false);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center space-x-2 border-2 ${
                  isSelected
                    ? "bg-emerald-900 text-amber-200 border-amber-400 shadow-lg scale-105"
                    : "bg-white text-stone-700 border-stone-200 hover:border-emerald-700 hover:bg-stone-50"
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isSelected ? "text-amber-300" : "text-stone-400"}`} />
                <span>{artifact.name}</span>
                {artifact.isCustomTexture && (
                  <span className="text-[10px] bg-amber-400 text-stone-950 px-1.5 py-0.5 rounded font-black">
                    Mới
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Khung tương tác chính */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cột 1: Trình diễn 3D */}
          <div className="lg:col-span-7 space-y-3">
            {selectedArtifact.isCustomTexture ? (
              // Trình diễn 3D dựng trực tiếp từ ảnh dệt thổ cẩm người dùng tải lên
              <Textile3DViewer
                textureUrl="/tho_cam_mau.jpg"
                name={selectedArtifact.name}
                category={selectedArtifact.category}
              />
            ) : (
              // Trình diễn Google model-viewer thông thường
              <ModelViewer3D artifact={selectedArtifact} />
            )}

            {/* Khối so sánh ảnh mẫu gốc */}
            <div className="flex items-center justify-between text-xs text-stone-600 bg-white p-3 rounded-xl border border-stone-200">
              <span className="flex items-center space-x-1.5 font-bold text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Người lưu giữ: {selectedArtifact.keeper}</span>
              </span>
              <span className="flex items-center space-x-1 text-stone-500">
                <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                <span>Dựng từ ảnh mẫu dệt thực tế</span>
              </span>
            </div>
          </div>

          {/* Cột 2: Audio-First Guide & Chi tiết di sản */}
          <div className="lg:col-span-5 space-y-5">
            {/* 🎧 KHỐI AUDIO-FIRST GUIDE PLAYER */}
            <div className="bg-emerald-950 text-amber-50 p-5 rounded-2xl shadow-xl space-y-4 border-2 border-emerald-800 outdoor-card">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-2 text-xs font-black text-amber-300 uppercase tracking-wider">
                  <Headphones className="w-4 h-4 text-emerald-400" />
                  <span>Audio-First Thuyết Minh</span>
                </span>
                <span className="text-xs text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded-full font-bold">
                  {selectedArtifact.audioDuration}
                </span>
              </div>

              {/* Lời trích thuyết minh */}
              <p className="text-xs text-stone-200 italic bg-emerald-900/40 p-3 rounded-xl border border-emerald-800/80 leading-relaxed">
                "{selectedArtifact.audioStory}"
              </p>

              {/* Bộ điều khiển âm thanh */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={toggleAudio}
                  className="bg-amber-400 hover:bg-amber-300 text-stone-950 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center space-x-2 shadow-lg transition-all transform active:scale-95"
                >
                  {isPlayingAudio ? (
                    <>
                      <Pause className="w-4 h-4 fill-stone-950" />
                      <span>Tạm Dừng Thuyết Minh</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-stone-950" />
                      <span>Lắng Nghe Câu Chuyện</span>
                    </>
                  )}
                </button>

                <div className="text-[11px] text-emerald-300 flex items-center space-x-1">
                  <span>💡 Đeo tai nghe để cảm nhận</span>
                </div>
              </div>

              {/* Thẻ audio phát thanh */}
              <audio
                ref={audioRef}
                src={selectedArtifact.audioFileUrl}
                onEnded={() => setIsPlayingAudio(false)}
              />
            </div>

            {/* THÔNG SỐ VẬT THỂ & GIÁ TRỊ VĂN HÓA CHI TIẾT */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-4 outdoor-card text-left">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {selectedArtifact.category}
                </span>
                <h3 className="text-lg font-black text-stone-900 mt-1 outdoor-text leading-snug">
                  {selectedArtifact.name}
                </h3>
                <p className="text-xs text-amber-800 font-bold">{selectedArtifact.subTitle}</p>
              </div>

              {/* Bảng thông số */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-stone-50 p-3 rounded-xl border border-stone-100">
                <div>
                  <span className="text-stone-500 block">Chất liệu:</span>
                  <span className="font-bold text-stone-800">{selectedArtifact.material}</span>
                </div>
                <div>
                  <span className="text-stone-500 block">Kích thước:</span>
                  <span className="font-bold text-stone-800">{selectedArtifact.dimension}</span>
                </div>
              </div>

              {/* Chiều sâu di sản */}
              <div className="space-y-2 text-xs text-stone-700 leading-relaxed border-t border-stone-100 pt-3">
                <h4 className="font-bold text-stone-900 flex items-center space-x-1 text-xs">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Ý Nghĩa & Bí Quyết Dân Gian:</span>
                </h4>
                <p>{selectedArtifact.culturalSignificance}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
