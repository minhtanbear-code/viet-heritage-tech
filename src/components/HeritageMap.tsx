"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Checkpoint, TA_LAI_CHECKPOINTS } from "@/data/checkpoints";
import { MapPin, Navigation, Volume2, Sparkles, Filter, Info, Eye } from "lucide-react";

// Tải Leaflet động (chỉ chạy ở phía Client, tránh lỗi SSR)
const MapComponent = dynamic(() => import("./LeafletMapInternal"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[450px] bg-stone-100 rounded-2xl flex items-center justify-center border border-stone-200">
      <div className="flex flex-col items-center space-y-2 text-stone-500">
        <div className="w-8 h-8 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs font-semibold">Đang tải bản đồ di sản Tà Lài...</span>
      </div>
    </div>
  ),
});

interface HeritageMapProps {
  onSelectCheckpoint: (cp: Checkpoint) => void;
  selectedCheckpointId?: string;
}

export default function HeritageMap({ onSelectCheckpoint, selectedCheckpointId }: HeritageMapProps) {
  const [filter, setFilter] = useState<string>("all");
  const [filteredPoints, setFilteredPoints] = useState<Checkpoint[]>(TA_LAI_CHECKPOINTS);

  useEffect(() => {
    if (filter === "all") {
      setFilteredPoints(TA_LAI_CHECKPOINTS);
    } else {
      setFilteredPoints(TA_LAI_CHECKPOINTS.filter((p) => p.category === filter));
    }
  }, [filter]);

  return (
    <div className="space-y-4">
      {/* Thanh bộ lọc danh mục */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-200">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-700">
          <Filter className="w-3.5 h-3.5 text-emerald-800" />
          <span>Bộ lọc điểm chạm:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
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
            🏛️ Văn hóa / Nhà dài
          </button>
          <button
            onClick={() => setFilter("craft")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === "craft"
                ? "bg-emerald-800 text-amber-50 shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            🧶 Làng nghề dệt
          </button>
          <button
            onClick={() => setFilter("homestay")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filter === "homestay"
                ? "bg-emerald-800 text-amber-50 shadow-sm"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            🏡 Homestay / Nghỉ dưỡng
          </button>
        </div>
      </div>

      {/* Bản đồ Leaflet nhúng */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-stone-300 shadow-lg outdoor-card">
        <MapComponent
          checkpoints={filteredPoints}
          selectedId={selectedCheckpointId}
          onSelect={onSelectCheckpoint}
        />

        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl text-[11px] font-bold text-stone-800 shadow-md border border-stone-200 max-w-xs pointer-events-none">
          <span className="text-emerald-800 block">🌲 Tọa độ: Làng Mạ, Tà Lài, VQG Cát Tiên</span>
          <span className="text-stone-500 font-normal">Chạm vào điểm ghim để xem chỉ đường mốc cảnh quan</span>
        </div>
      </div>

      {/* Danh sách thẻ địa điểm thu gọn */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredPoints.map((point) => (
          <div
            key={point.id}
            onClick={() => onSelectCheckpoint(point)}
            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
              selectedCheckpointId === point.id
                ? "bg-emerald-50 border-emerald-700 ring-2 ring-emerald-700/20"
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
                <span>Xem chỉ đường</span>
              </span>
              <span className="flex items-center space-x-1 text-stone-500">
                <Volume2 className="w-3 h-3" />
                <span>{point.audioDuration}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
