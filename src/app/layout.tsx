import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VIETHeritage — Di sản được gìn giữ, Văn hóa tiếp nối tương lai",
  description:
    "Dự án ứng dụng công nghệ số để bảo tồn, lưu giữ và quảng bá các giá trị văn hóa truyền thống của cộng đồng người Mạ tại Đồng Nai, Việt Nam.",
  keywords: [
    "VIETHeritage",
    "Người Mạ",
    "Tà Lài",
    "Đồng Nai",
    "Bảo tồn di sản",
    "Du lịch văn hóa thông minh",
    "Thổ cẩm Mạ",
  ],
  authors: [{ name: "VIET NOVA — Đại học Nguyễn Tất Thành" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${playfairDisplay.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col selection:bg-[#E8D8B8] selection:text-[#263D32]">
        {children}
      </body>
    </html>
  );
}
