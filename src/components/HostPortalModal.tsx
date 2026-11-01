"use client";

import React, { useState } from "react";
import { QrCode, CheckCircle2, AlertCircle, Sparkles, Store, RefreshCw } from "lucide-react";

export default function HostPortalModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [voucherInput, setVoucherInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);

  if (!isOpen) return null;

  const handleVerify = (codeToTest?: string) => {
    setIsVerifying(true);
    setResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      setResult("success");
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-emerald-800 space-y-5 relative outdoor-card text-center">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-1.5 rounded-full hover:bg-stone-100 text-sm font-bold"
        >
          ✕
        </button>

        <div className="space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
            <Store className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-black uppercase text-emerald-800 tracking-wider bg-emerald-50 px-3 py-0.5 rounded-full">
            Dành Cho Chủ Homestay & Nghệ Nhân Làng Mạ
          </span>
          <h3 className="text-xl font-black text-stone-900 mt-1 outdoor-text">
            Cổng Xác Nhận Đổi Voucher 1-Chạm
          </h3>
          <p className="text-xs text-stone-600">
            Giao diện chữ lớn, thao tác nhanh không cần đăng nhập mật khẩu phức tạp.
          </p>
        </div>

        {/* Khung kết quả xác nhận cực đại */}
        {result === "success" ? (
          <div className="bg-emerald-500 text-white p-6 rounded-3xl shadow-xl space-y-3 animate-bounce">
            <CheckCircle2 className="w-16 h-16 mx-auto text-white" />
            <h4 className="text-2xl font-black tracking-wide">VOUCHER HỢP LỆ!</h4>
            <div className="bg-white/20 p-3 rounded-2xl text-sm font-extrabold space-y-1 text-emerald-50">
              <p>🎁 TẶNG 1 VÒNG TAY THỔ CẨM</p>
              <p>HOẶC GIẢM 50.000Đ TIỀN PHÒNG</p>
            </div>
            <button
              onClick={() => setResult(null)}
              className="mt-2 bg-stone-950 hover:bg-stone-900 text-amber-200 text-xs font-bold px-4 py-2 rounded-xl shadow"
            >
              Xác Nhận Đã Trao Quà
            </button>
          </div>
        ) : (
          <div className="bg-stone-50 border-2 border-dashed border-stone-300 p-6 rounded-3xl space-y-4">
            <div className="w-14 h-14 bg-emerald-800 text-white rounded-2xl mx-auto flex items-center justify-center shadow-md">
              <QrCode className="w-8 h-8" />
            </div>

            <p className="text-xs text-stone-700 font-bold">
              Hướng camera điện thoại vào mã QR trên máy của khách du lịch
            </p>

            {/* Nút bấm test nhanh */}
            <button
              onClick={() => handleVerify()}
              disabled={isVerifying}
              className="w-full bg-emerald-800 hover:bg-emerald-900 text-amber-100 py-3.5 rounded-2xl font-black text-sm flex items-center justify-center space-x-2 shadow-lg transition-all"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Đang Kiểm Tra Voucher...</span>
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4" />
                  <span>Bấm Để Giả Lập Quét Mã Khách</span>
                </>
              )}
            </button>
          </div>
        )}

        <div className="text-[11px] text-stone-500">
          💡 Hệ thống tự động đối chiếu mã hợp lệ và đánh dấu đã sử dụng, chống gian lận.
        </div>
      </div>
    </div>
  );
}
