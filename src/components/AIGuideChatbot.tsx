"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldCheck,
  ChevronDown,
  RefreshCw,
  HelpCircle,
  Compass,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  time: string;
  source?: string;
}

export default function AIGuideChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Xin chào bạn! Tôi là **Trợ lý Di sản Số Làng Mạ**. Mọi câu trả lời của tôi đều được đối chiếu từ kho tri thức đã qua kiểm duyệt của Già làng và Nghệ nhân Ka Bào tại Tà Lài. Bạn muốn tìm hiểu điều gì hôm nay?",
      time: "Vừa xong",
      source: "Kiến thức Đã Thẩm Định",
    },
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Ý nghĩa kiến trúc Nhà Dài mái mu rùa là gì?",
    "Nghệ nhân Ka Bào nhuộm màu thổ cẩm từ những loại cây rừng nào?",
    "Tại sao bộ cồng chiêng người Mạ lại có 6 chiếc?",
    "Đến Tà Lài thì có những món ăn đặc sản nào?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMsg("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.reply || "Dạ, tôi chưa nhận được phản hồi. Bạn thử lại nhé!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Xin lỗi bạn, kết nối đến Trợ lý AI đang gián đoạn. Bạn thử lại sau ít giây nhé!",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-stone-800 shadow-2xl overflow-hidden flex flex-col h-[520px] outdoor-card">
      {/* 🧭 HEADER CHATBOT */}
      <div className="bg-gradient-to-r from-emerald-900 to-stone-900 p-4 text-amber-50 flex items-center justify-between border-b border-stone-800">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shadow-md">
              <Bot className="w-6 h-6" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-stone-900"></span>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-black text-sm tracking-wide text-stone-100">
                Trợ Lý AI Di Sản Làng Mạ
              </h3>
              <span className="text-[10px] bg-emerald-800 text-emerald-200 font-bold px-2 py-0.5 rounded-full border border-emerald-600/50">
                RAG Guardrails
              </span>
            </div>
            <p className="text-[11px] text-stone-300 flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Chống ảo giác • Đồng hành cùng Già làng & Nghệ nhân</span>
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1 text-xs text-amber-300 font-bold bg-stone-800/80 px-2.5 py-1 rounded-xl border border-stone-700">
          <Compass className="w-3.5 h-3.5" />
          <span>Trực địa 24/7</span>
        </div>
      </div>

      {/* 💬 NỘI DUNG CUỘC TRÒ CHUYỆN */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start space-x-2.5 ${
              m.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                m.sender === "user"
                  ? "bg-amber-600 text-white"
                  : "bg-emerald-800 text-amber-200"
              }`}
            >
              {m.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                m.sender === "user"
                  ? "bg-emerald-800 text-amber-50 rounded-tr-none font-medium"
                  : "bg-white text-stone-800 border border-stone-200 rounded-tl-none outdoor-text"
              }`}
            >
              <div className="whitespace-pre-line">{m.text}</div>
              <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-stone-100/30 text-[10px] text-stone-400">
                <span>{m.time}</span>
                {m.source && (
                  <span className="text-emerald-700 font-semibold">{m.source}</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-stone-500 text-xs italic p-2 bg-stone-100 rounded-xl w-fit">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-700" />
            <span>AI đang đối chiếu tư liệu văn hóa Làng Mạ...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 💡 CÂU HỎI GỢI Ý NHANH */}
      <div className="p-2.5 bg-stone-100 border-t border-stone-200 overflow-x-auto flex items-center space-x-2 no-scrollbar">
        <span className="text-[11px] font-bold text-stone-500 flex items-center space-x-1 flex-shrink-0 pl-1">
          <HelpCircle className="w-3 h-3 text-amber-600" />
          <span>Gợi ý:</span>
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="flex-shrink-0 bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-300 hover:border-emerald-700 px-3 py-1 rounded-full text-[11px] font-semibold transition-all shadow-xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* ✍️ Ô NHẬP TIN NHẮN */}
      <div className="p-3 bg-white border-t border-stone-200 flex items-center space-x-2">
        <input
          type="text"
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Hỏi AI về kiến trúc nhà dài, thổ cẩm, cồng chiêng, ẩm thực..."
          className="flex-1 bg-stone-100 text-stone-900 text-xs sm:text-sm px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-700"
        />
        <button
          onClick={() => handleSend()}
          disabled={isLoading || !inputMsg.trim()}
          className="bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-amber-200 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center space-x-1 shadow transition-all"
        >
          <span>Gửi</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
