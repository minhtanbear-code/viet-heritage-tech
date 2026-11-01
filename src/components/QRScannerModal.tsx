"use client";

import React, { useState } from "react";
import { Checkpoint, TA_LAI_CHECKPOINTS } from "@/data/checkpoints";
import { QrCode, Camera, CheckCircle2, AlertCircle, RefreshCw, Sparkles, Navigation } from "lucide-react";

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDetectCheckpoint: (cp: Checkpoint) => void;
}

export default function QRScannerModal({
  isOpen,
  onClose,
  onDetectCheckpoint,
}: QRScannerModalProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = (checkpoint: Checkpoint) => {
    setIsScanning(true);
    setSuccessMessage(null);

    // Giả lập quét camera nhận diện nhanh trong 400ms
    setTimeout(() => {
      setIsScanning(false);
      setSuccessMessage(`Đã nhận diện thành công: ${checkpoint.name}`);
      setTimeout(() => {
        onDetectCheckpoint(checkpoint);
        onClose();
        setSuccessMessage(null);
      }, 700);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-stone-800 space-y-5 relative outdoor-card">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-1.5 rounded-full hover:bg-stone-100 transition-all text-sm font-bold"
        >
          ✕
        </button>

        {/* Tiêu đề modal */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2 shadow-inner">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-stone-900 outdoor-text">
            Trình Quét Mã QR Thực Địa
          </h3>
          <p className="text-xs text-stone-600 max-w-xs mx-auto">
            Hướng camera vào mã QR gắn trên cột nhà sàn hoặc khung dệt tại Làng Mạ.
          </p>
        </div>

        {/* Khung mô phỏng kính ngắm quét camera */}
        <div className="relative aspect-square max-w-[280px] mx-auto rounded-2xl bg-stone-950 overflow-hidden border-4 border-emerald-700 flex flex-col items-center justify-center text-center p-4 shadow-xl">
          {/* 4 góc ngắm quét */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-amber-400"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-amber-400"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-amber-400"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-amber-400"></div>

          {/* Tia quét laser chuyển động */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-pulse top-1/2"></div>

          {isScanning ? (
            <div className="flex flex-col items-center space-y-2 text-amber-200">
              <RefreshCw className="w-8 h-8 animate-spin text-amber-400" />
              <span className="text-xs font-bold">Đang đối chiếu tọa độ di sản...</span>
            </div>
          ) : successMessage ? (
            <div className="flex flex-col items-center space-y-2 text-emerald-400 p-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-bounce" />
              <span className="text-xs font-bold text-center">{successMessage}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2 text-stone-400">
              <Camera className="w-10 h-10 text-stone-500 animate-pulse" />
              <span className="text-[11px] font-medium text-stone-300">
                Camera đang sẵn sàng quét mã...
              </span>
            </div>
          )}
        </div>

        {/* Bộ mã QR mẫu để bạn test ngay trên Localhost */}
        <div className="pt-2 border-t border-stone-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-700">
            <span className="flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Chế độ Test nhanh (Bấm chọn mã để thử nghiệm):</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {TA_LAI_CHECKPOINTS.slice(0, 4).map((cp) => (
              <button
                key={cp.id}
                onClick={() => handleSimulateScan(cp)}
                className="p-2.5 rounded-xl border border-stone-200 hover:border-emerald-700 bg-stone-50 hover:bg-emerald-50/60 text-left transition-all text-xs font-semibold text-stone-800 flex items-center justify-between group"
              >
                <div className="truncate pr-1">
                  <span className="block text-[10px] text-emerald-800 font-bold uppercase">{cp.categoryName}</span>
                  <span className="truncate block font-bold text-stone-900 group-hover:text-emerald-800">{cp.name}</span>
                </div>
                <QrCode className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
