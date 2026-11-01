"use client";

import React, { useEffect, useState } from "react";
import { HeritageArtifact } from "@/data/artifacts";
import {
  RotateCcw,
  Sparkles,
  Smartphone,
} from "lucide-react";

interface ModelViewer3DProps {
  artifact: HeritageArtifact;
}

export default function ModelViewer3D({ artifact }: ModelViewer3DProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    import("@google/model-viewer")
      .then(() => setIsLoaded(true))
      .catch((err) => console.error("Error loading model-viewer:", err));
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] bg-gradient-to-b from-stone-900 via-stone-850 to-stone-950 rounded-2xl overflow-hidden border-2 border-stone-800 shadow-2xl flex flex-col justify-between p-4 outdoor-card">
      {/* 🏷️ THẺ THÔNG TIN TRÊN GÓC 3D */}
      <div className="z-10 flex items-start justify-between w-full pointer-events-none">
        <div className="bg-stone-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-700 text-left shadow-lg pointer-events-auto">
          <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider block">
            {artifact.category}
          </span>
          <span className="text-xs font-bold text-stone-100 block">
            {artifact.name}
          </span>
        </div>

        <div className="flex items-center space-x-1.5 bg-emerald-950/90 backdrop-blur-md border border-emerald-700/60 text-emerald-300 text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-lg pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>WebAR Sẵn Sàng</span>
        </div>
      </div>

      {/* 🔮 GOOGLE MODEL-VIEWER 3D CONTAINER */}
      <div className="absolute inset-0 flex items-center justify-center">
        {isLoaded ? (
          React.createElement(
            "model-viewer",
            {
              src: artifact.modelUrl,
              poster: artifact.posterImage,
              alt: artifact.name,
              "auto-rotate": true,
              "camera-controls": true,
              "rotation-per-second": "20deg",
              "shadow-intensity": "1.5",
              exposure: "1",
              ar: true,
              "ar-modes": "webxr scene-viewer quick-look",
              "ar-scale": "auto",
              style: { width: "100%", height: "100%", backgroundColor: "transparent" },
            },
            React.createElement(
              "button",
              {
                slot: "ar-button",
                className:
                  "absolute bottom-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-xl flex items-center space-x-2 border-2 border-amber-300 transition-all transform active:scale-95",
              },
              React.createElement(Smartphone, { className: "w-4 h-4 text-stone-950 inline mr-1.5" }),
              "Xem AR Trong Không Gian Thực"
            )
          )
        ) : (
          <div className="flex flex-col items-center space-y-3 text-stone-400">
            <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-semibold">Đang tải không gian 3D hiện vật Làng Mạ...</span>
          </div>
        )}
      </div>

      {/* 🧭 HƯỚNG DẪN THAO TÁC XOAY 360 */}
      <div className="z-10 flex items-center justify-between w-full pointer-events-none text-[11px] text-stone-400 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-800">
        <span className="flex items-center space-x-1">
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>Dùng chuột hoặc ngón tay để <strong>xoay 360°</strong> & <strong>phóng to hiện vật</strong></span>
        </span>
        <span className="hidden sm:inline text-stone-500">Mô hình nén Draco &lt; 1.5MB</span>
      </div>
    </div>
  );
}
