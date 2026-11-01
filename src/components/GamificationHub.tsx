"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Gift,
  Trophy,
  CheckCircle2,
  QrCode,
  Sparkles,
  ArrowRight,
  Eye,
  Camera,
  Share2,
  Award,
} from "lucide-react";

interface Quest {
  id: string;
  title: string;
  type: "observation" | "quiz";
  description: string;
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
  hint: string;
}

const QUESTS: Quest[] = [
  {
    id: "q1",
    title: "Thử Thách 1: Giải Mã Khung Cửi Thổ Cẩm",
    type: "observation",
    description: "Quan sát trực tiếp tại xưởng dệt của Nghệ nhân Ka Bào.",
    question: "Người phụ nữ Mạ dùng nguyên liệu rừng nào để nhuộm ra màu ĐỎ tươi truyền thống cho sợi vải?",
    options: [
      "Vỏ cây Klút hoặc cây bàng rừng tự nhiên",
      "Hóa chất nhuộm công nghiệp từ chợ",
      "Quả gấc chín phơi khô",
      "Lá trà xanh ngâm phèn chua",
    ],
    correctIndex: 0,
    points: 50,
    hint: "Hãy nhìn vào bảng giới thiệu cạnh khung dệt hoặc nghe Audio Guide đoạn 1:15.",
  },
  {
    id: "q2",
    title: "Thử Thách 2: Kiến Trúc Nhà Dài Mái Mu Rùa",
    type: "observation",
    description: "Quan sát kiến trúc căn nhà dài cổ tại bản làng.",
    question: "Điểm đặc biệt nhất trong kỹ thuật xây dựng nhà dài mu rùa của người Mạ là gì?",
    options: [
      "Sử dụng toàn bộ đinh sắt và bu-lông cỡ lớn",
      "Ghép nối hoàn toàn bằng tre nứa, dây mây rừng đan kết và chốt gỗ",
      "Đổ bê tông cốt thép giả vân gỗ",
      "Dùng keo dán công nghiệp hiện đại",
    ],
    correctIndex: 1,
    points: 50,
    hint: "Để ý các mối nối trên xà ngang của mái nhà dài.",
  },
];

export default function GamificationHub() {
  const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [voucherCode, setVoucherCode] = useState<string | null>(null);

  const quest = QUESTS[currentQuestIndex];

  const handleSelectOption = (index: number) => {
    setSelectedAnswers({ ...selectedAnswers, [quest.id]: index });
  };

  const handleNext = () => {
    // Kiểm tra câu trả lời
    const isCorrect = selectedAnswers[quest.id] === quest.correctIndex;
    if (isCorrect) {
      setTotalScore((prev) => prev + quest.points);
    }

    if (currentQuestIndex < QUESTS.length - 1) {
      setCurrentQuestIndex((prev) => prev + 1);
    } else {
      // Hoàn thành toàn bộ nhiệm vụ
      setIsCompleted(true);
      const code = `VHT-TALAI-${Math.floor(1000 + Math.random() * 9000)}`;
      setVoucherCode(code);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-stone-800 shadow-2xl overflow-hidden p-6 outdoor-card space-y-6">
      {/* 🏆 HEADER GAMIFICATION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-100 px-3 py-1 rounded-full">
              Thực Địa Gamification
            </span>
            <span className="text-xs font-bold text-amber-700 flex items-center space-x-1">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>Điểm thưởng: {totalScore} XP</span>
            </span>
          </div>
          <h3 className="text-xl font-black text-stone-900 mt-1 outdoor-text">
            Thử Thách Khám Phá & Đổi Voucher Homestay
          </h3>
          <p className="text-xs text-stone-600">
            Quan sát cảnh quan thực tế tại Làng Mạ để trả lời câu hỏi và nhận quà độc quyền.
          </p>
        </div>

        {/* Huy hiệu di sản */}
        <div className="flex items-center space-x-2 self-start sm:self-auto bg-amber-50 border border-amber-300 px-3 py-1.5 rounded-2xl">
          <Award className="w-6 h-6 text-amber-600" />
          <div className="text-left">
            <span className="text-[10px] text-stone-500 font-bold block uppercase">Huy hiệu</span>
            <span className="text-xs font-extrabold text-amber-900 block">Người Bạn Buôn Làng</span>
          </div>
        </div>
      </div>

      {/* 🎯 NỘI DUNG THỬ THÁCH */}
      {!isCompleted ? (
        <div className="space-y-5">
          <div className="flex items-center justify-between text-xs font-bold text-stone-500">
            <span>Câu hỏi {currentQuestIndex + 1} / {QUESTS.length}</span>
            <span className="text-emerald-800">+{quest.points} XP thưởng</span>
          </div>

          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-black text-stone-900 outdoor-text">
              {quest.title}
            </h4>
            <p className="text-xs text-stone-600 italic">{quest.description}</p>
          </div>

          <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200 text-xs sm:text-sm font-bold text-stone-800">
            ❓ {quest.question}
          </div>

          {/* Các lựa chọn */}
          <div className="space-y-2.5">
            {quest.options.map((option, idx) => {
              const isSelected = selectedAnswers[quest.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-emerald-800 text-amber-100 border-emerald-800 shadow-md ring-2 ring-emerald-700/30"
                      : "bg-white text-stone-800 border-stone-200 hover:bg-stone-50 hover:border-emerald-700"
                  }`}
                >
                  <span>{option}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Gợi ý quan sát */}
          <div className="flex items-center space-x-1.5 text-xs text-amber-900 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
            <Eye className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span><strong>Mẹo quan sát:</strong> {quest.hint}</span>
          </div>

          {/* Nút nộp & tiếp theo */}
          <button
            onClick={handleNext}
            disabled={selectedAnswers[quest.id] === undefined}
            className="w-full bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-amber-100 py-3 rounded-xl font-black text-sm flex items-center justify-center space-x-2 shadow-lg transition-all"
          >
            <span>
              {currentQuestIndex < QUESTS.length - 1 ? "Câu Tiếp Theo" : "Hoàn Thành & Đổi Quà"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* 🎉 KHO VOUCHER & QUÀ TẶNG KHI HOÀN THÀNH */
        <div className="text-center space-y-6 py-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
            <Gift className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h4 className="text-2xl font-black text-stone-900 outdoor-text">
              Chúc Mừng Bạn Đã Hoàn Thành!
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
              Bạn đạt được <strong>{totalScore} XP</strong> và nhận được 1 Voucher quà tặng độc quyền từ đồng bào Làng Mạ.
            </p>
          </div>

          {/* Thẻ Voucher QR */}
          <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-stone-950 p-5 rounded-3xl shadow-xl max-w-sm mx-auto border-4 border-amber-300 space-y-4">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider">
              <span>Voucher Di Sản Làng Mạ</span>
              <span className="bg-stone-950 text-amber-200 px-2 py-0.5 rounded-full text-[10px]">
                Có hiệu lực
              </span>
            </div>

            <div className="bg-white p-4 rounded-2xl flex flex-col items-center space-y-2 shadow-inner">
              {/* Mô phỏng mã QR voucher */}
              <div className="w-32 h-32 bg-stone-950 rounded-xl p-2 flex items-center justify-center text-white">
                <QrCode className="w-24 h-24 text-amber-400" />
              </div>
              <span className="font-mono font-black text-sm text-stone-900 tracking-wider">
                {voucherCode}
              </span>
            </div>

            <div className="text-left text-xs space-y-1 text-stone-900 font-bold">
              <p>🎁 <strong>Phần thưởng lựa chọn:</strong></p>
              <p>• Tặng 1 Vòng tay thổ cẩm dệt thủ công</p>
              <p>• HOẶC Giảm 50.000đ khi đặt phòng Homestay Tà Lài</p>
            </div>

            <div className="text-[11px] text-stone-950/80 italic pt-1 border-t border-amber-400">
              Chìa mã QR này cho chủ homestay hoặc quầy lưu niệm để đổi quà ngay tại thực địa.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
