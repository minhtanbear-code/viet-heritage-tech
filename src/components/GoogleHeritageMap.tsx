"use client";

import React, { useState } from "react";
import { Checkpoint, TA_LAI_CHECKPOINTS } from "@/data/checkpoints";
import { MapPin, Navigation, Volume2, Sparkles, Filter, ExternalLink, Layers, Compass } from "lucide-react";

interface GoogleHeritageMapProps {
  onSelectCheckpoint: (cp: Checkpoint) => void;
  selectedCheckpointId?: string;
}

export default function GoogleHeritageMap({
  onSelectCheckpoint,
  selectedCheckpointId,
}: GoogleHeritageMapProps) {
  const [filter, setFilter] = useState<string>("all");
  const [activeCheckpoint, setActiveCheckpoint] = useState<Checkpoint>(
    TA_LAI_CHECKPOINTS.find((p) => p.id === selectedCheckpointId) || TA_LAI_CHECKPOINTS[0]
  );
  const [mapType, setMapType] = useState<"roadmap" | "satellite">("satellite"); // Mặc định vệ tinh ngắm rừng đại ngàn Cát Tiên

  const filteredPoints =
    filter === "all"
      ? TA_LAI_CHECKPOINTS
      : TA_LAI_CHECKPOINTS.filter((p) => p.category === filter);

  const handleSelect = (cp: Checkpoint) => {
    setActiveCheckpoint(cp);
    onSelectCheckpoint(cp);
  };

  // Tạo URL Google Maps Embed chính thức (100% Miễn phí, không cần API Key có phí)
  // t=k: Chế độ Vệ tinh rừng Cát Tiên; t=m: Chế độ Bản đồ đường bộ chuẩn
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${activeCheckpoint.lat},${activeCheckpoint.lng}&hl=vi&z=16&t=${
    mapType === "satellite" ? "k" : "m"
  }&output=embed`;

  return (
    <div className="space-y-4">
      {/* Thanh công cụ: Bộ lọc danh mục & Chuyển đổi Vệ tinh / Đường phố */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200">
        {/* Bộ lọc danh mục */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
          <span className="flex items-center space-x-1 text-stone-700 mr-1">
            <Filter className="w-3.5 h-3.5 text-emerald-800" />
            <span>Điểm chạm:</span>
          </span>
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === "all"
                ? "bg-emerald-800 text-amber-50 shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            Tất cả ({TA_LAI_CHECKPOINTS.length})
          </button>
          <button
            onClick={() => setFilter("culture")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === "culture"
                ? "bg-emerald-800 text-amber-50 shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            🏛️ Nhà Dài & Di sản
          </button>
          <button
            onClick={() => setFilter("craft")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === "craft"
                ? "bg-emerald-800 text-amber-50 shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            🧶 Làng Dệt Thổ Cẩm
          </button>
          <button
            onClick={() => setFilter("homestay")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === "homestay"
                ? "bg-emerald-800 text-amber-50 shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            🏡 Homestay Bản Địa
          </button>
        </div>

        {/* Nút chuyển đổi chế độ xem Google Vệ tinh / Đường phố */}
        <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-bold">
          <button
            onClick={() => setMapType("satellite")}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition-all ${
              mapType === "satellite"
                ? "bg-emerald-800 text-amber-100 shadow"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Ảnh chụp từ vệ tinh Google nhìn rõ rừng Nam Cát Tiên và nhà sàn Làng Mạ"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Google Vệ Tinh</span>
          </button>
          <button
            onClick={() => setMapType("roadmap")}
            className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg transition-all ${
              mapType === "roadmap"
                ? "bg-emerald-800 text-amber-100 shadow"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Bản đồ đường bộ Google Maps"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Google Đường Bộ</span>
          </button>
        </div>
      </div>

      {/* KHUNG BẢN ĐỒ GOOGLE MAPS THỰC ĐỊA */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-stone-800 shadow-xl aspect-[16/9] sm:h-[480px] w-full outdoor-card bg-stone-900">
        <iframe
          title="Bản đồ Google Làng Mạ Tà Lài"
          src={googleMapEmbedUrl}
          className="w-full h-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        {/* Thẻ ghim thông tin điểm đang kích hoạt trên Google Maps */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-stone-200 max-w-sm hidden sm:block">
          <div className="flex items-center justify-between text-[11px] mb-1">
            <span className="font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
              {activeCheckpoint.categoryName}
            </span>
            <span className="text-stone-500 font-semibold flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-red-600" />
              <span>Google Maps Live</span>
            </span>
          </div>
          <h4 className="font-black text-sm text-stone-950 outdoor-text">{activeCheckpoint.name}</h4>
          <p className="text-xs text-stone-600 mt-1 line-clamp-2">{activeCheckpoint.wayfindingTip}</p>
          <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between">
            <button
              onClick={() => onSelectCheckpoint(activeCheckpoint)}
              className="bg-emerald-800 hover:bg-emerald-900 text-amber-50 px-3 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 shadow"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Nghe Thuyết Minh</span>
            </button>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${activeCheckpoint.lat},${activeCheckpoint.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-800 hover:underline text-xs font-bold flex items-center space-x-0.5"
            >
              <span>Mở Google App</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* DANH SÁCH CÁC ĐIỂM CHẠM ĐỂ CHUYỂN NHANH TRÊN GOOGLE MAPS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredPoints.map((point) => {
          const isSelected = point.id === activeCheckpoint.id;
          return (
            <div
              key={point.id}
              onClick={() => handleSelect(point)}
              className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                isSelected
                  ? "bg-emerald-50/80 border-emerald-700 ring-2 ring-emerald-700/30 shadow-md"
                  : "bg-white border-stone-200 hover:border-emerald-600 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                  {point.categoryName}
                </span>
                {point.has3D && (
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center space-x-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Có 3D</span>
                  </span>
                )}
              </div>

              <h4 className="font-bold text-sm text-stone-900 mt-2 line-clamp-1 outdoor-text">{point.name}</h4>
              <p className="text-xs text-stone-600 mt-1 line-clamp-2">{point.description}</p>

              <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold text-emerald-800">
                <span className="flex items-center space-x-1">
                  <Navigation className="w-3 h-3 text-emerald-700" />
                  <span>Định vị Google</span>
                </span>
                <span className="flex items-center space-x-1 text-stone-500">
                  <Volume2 className="w-3 h-3" />
                  <span>{point.audioDuration}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
