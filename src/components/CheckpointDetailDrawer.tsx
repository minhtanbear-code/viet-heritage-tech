"use client";

import React, { useState } from "react";
import { Checkpoint } from "@/data/checkpoints";
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Headphones,
  Navigation,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface CheckpointDetailDrawerProps {
  checkpoint: Checkpoint | null;
  onClose: () => void;
}

export default function CheckpointDetailDrawer({
  checkpoint,
  onClose,
}: CheckpointDetailDrawerProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!checkpoint) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 max-w-md w-full bg-white shadow-2xl border-l-2 border-stone-800 flex flex-col outdoor-card animate-slideLeft">
      {/* Header Drawer */}
      <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-[#fbf9f5]">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-emerald-700 animate-ping"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            {checkpoint.categoryName}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 text-sm font-bold w-8 h-8 flex items-center justify-center"
        >
          ✕
        </button>
      </div>

      {/* Nội dung chi tiết */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Ảnh đại diện hiện vật */}
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-stone-200 shadow-sm">
          <img
            src={checkpoint.image}
            alt={checkpoint.name}
            className="w-full h-full object-cover"
          />
          {checkpoint.has3D && (
            <div className="absolute bottom-2 right-2 bg-amber-500/90 text-stone-950 text-xs font-black px-2.5 py-1 rounded-lg shadow flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sẵn sàng WebAR 3D</span>
            </div>
          )}
        </div>

        {/* Tên & mô tả */}
        <div>
          <h2 className="text-xl font-black text-stone-900 outdoor-text leading-tight">
            {checkpoint.name}
          </h2>
          <p className="text-xs sm:text-sm text-stone-700 mt-2 leading-relaxed">
            {checkpoint.description}
          </p>
        </div>

        {/* 🎧 KHỐI AUDIO GUIDE "EYES-UP" */}
        <div className="bg-emerald-950 text-amber-50 p-4 rounded-2xl shadow-lg space-y-3 border border-emerald-800">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center space-x-1.5 font-bold text-amber-300">
              <Headphones className="w-4 h-4 text-emerald-400" />
              <span>Audio-First Guide: Nâng tầm mắt</span>
            </span>
            <span className="text-[11px] text-stone-300">{checkpoint.audioDuration}</span>
          </div>

          <p className="text-xs text-stone-300 italic bg-emerald-900/40 p-2.5 rounded-xl border border-emerald-800/60">
            "{checkpoint.audioStory}"
          </p>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="bg-amber-400 hover:bg-amber-300 text-stone-950 px-4 py-2 rounded-xl text-xs font-extrabold flex items-center space-x-2 shadow transition-all"
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Tạm Dừng Thuyết Minh</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-stone-950" />
                  <span>Phát Thuyết Minh Âm Thanh</span>
                </>
              )}
            </button>

            <span className="text-[10px] text-emerald-400 flex items-center space-x-1">
              <span>Đeo tai nghe để giữ yên tĩnh</span>
            </span>
          </div>
        </div>

        {/* 📍 CHỈ ĐƯỜNG MỐC NHẬN DIỆN THỰC TẾ (VISUAL WAYFINDING) */}
        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl space-y-1.5 outdoor-card">
          <div className="flex items-center space-x-1.5 text-xs font-black text-amber-900">
            <Navigation className="w-4 h-4 text-amber-700" />
            <span>Chỉ đường Mốc Nhận Diện Hình Ảnh:</span>
          </div>
          <p className="text-xs text-stone-800 font-medium leading-relaxed">
            {checkpoint.wayfindingTip}
          </p>
        </div>

        {/* 🏛️ BẢO VỆ RIÊNG TƯ & TÍN NGƯỠNG BẢN ĐỊA */}
        <div className="flex items-start space-x-2 text-[11px] text-stone-600 bg-stone-100 p-3 rounded-xl border border-stone-200">
          <ShieldAlert className="w-4 h-4 text-stone-700 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Văn hóa bản địa:</strong> Vui lòng xin phép người dân trước khi bước vào gian buồng riêng hoặc chụp ảnh nghệ nhân lớn tuổi.
          </span>
        </div>
      </div>
    </div>
  );
}
