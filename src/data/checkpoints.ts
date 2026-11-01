export interface Checkpoint {
  id: string;
  name: string;
  category: "culture" | "homestay" | "craft" | "nature";
  categoryName: string;
  lat: number;
  lng: number;
  description: string;
  wayfindingTip: string; // Chỉ đường mốc nhận diện hình ảnh
  audioDuration: string;
  audioStory: string;
  has3D: boolean;
  model3DName?: string;
  qrCodeValue: string;
  image: string;
}

export const TA_LAI_CHECKPOINTS: Checkpoint[] = [
  {
    id: "nha-dai-mu-rua",
    name: "Nhà Dài Mái Mu Rùa Truyền Thống",
    category: "culture",
    categoryName: "Kiến trúc Di sản",
    lat: 11.4552,
    lng: 107.3912,
    description: "Biểu tượng kiến trúc ngàn đời của người Mạ. Mái khum tròn như mu rùa che chở cho đại gia đình nhiều thế hệ chung sống hòa thuận.",
    wayfindingTip: "Từ Bến phà Tà Lài đi thẳng theo trục đường làng 300m, nhìn sang tay phải thấy cây đa cổ thụ và mái nhà sàn dài bằng gỗ nổi bật.",
    audioDuration: "2 phút 45 giây",
    audioStory: "Chào bạn đến với Nhà Dài của người Mạ. Chiếc mái uốn cong này không chỉ che nắng mưa đại ngàn mà còn mang linh hồn của thần Rùa trong huyền thoại Yang...",
    has3D: true,
    model3DName: "Nhà Dài Làng Mạ",
    qrCodeValue: "VIET_HERITAGE_NHA_DAI",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "xuong-det-ka-bao",
    name: "Xưởng Dệt Thổ Cẩm Nghệ Nhân Ka Bào",
    category: "craft",
    categoryName: "Làng nghề Bản địa",
    lat: 11.4568,
    lng: 107.3935,
    description: "Nơi lưu giữ bí quyết dệt thổ cẩm cổ truyền với các gam màu tự nhiên lấy từ vỏ cây, củ rừng và hoa văn hình chim thú linh thiêng.",
    wayfindingTip: "Đi qua Nhà Dài thêm 150m, rẽ vào con ngõ lát đá hoa cau, lắng nghe tiếng khung cửi lách cách đều đặn của bà Ka Bào.",
    audioDuration: "3 phút 10 giây",
    audioStory: "Tiếng lách cách bạn đang nghe là nhịp đập của thời gian. Mỗi tấm vải thổ cẩm Mạ phải mất từ 1 đến 3 tháng kiên trì ngồi bên khung cửi...",
    has3D: true,
    model3DName: "Khung Cửi Dệt Cổ Truyền",
    qrCodeValue: "VIET_HERITAGE_THO_CAM",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "nha-sinh-hoat-cong-dong",
    name: "Không Gian Cồng Chiêng & Lễ Hội",
    category: "culture",
    categoryName: "Di sản Phi vật thể",
    lat: 11.4535,
    lng: 107.3895,
    description: "Khu vực sân cỏ trung tâm nơi diễn ra các đêm lửa trại, uống rượu cần và tấu cồng chiêng vào các dịp lễ mừng lúa mới, đâm trâu tạ ơn Yang.",
    wayfindingTip: "Ngay sát bãi cỏ rộng trước Nhà văn hóa cộng đồng Tà Lài, có cây nêu cao vút bằng tre nứa sặc sỡ sắc màu.",
    audioDuration: "2 phút 15 giây",
    audioStory: "Trong quan niệm người Mạ, tiếng chiêng là chiếc cầu nối giữa trần gian và các đấng thần linh Yang tối cao trên đỉnh núi...",
    has3D: true,
    model3DName: "Bộ Chiêng Thiêng 6 Chiếc",
    qrCodeValue: "VIET_HERITAGE_CONG_CHIENG",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ta-lai-ecolodge",
    name: "Tà Lài Longhouse & Homestay Sinh Thái",
    category: "homestay",
    categoryName: "Nghỉ dưỡng & Ẩm thực",
    lat: 11.4582,
    lng: 107.3948,
    description: "Khu lưu trú cộng đồng do chính bà con địa phương vận hành. Thưởng thức cơm lam, rau rừng, đọt mây nướng và canh bồi cá suối tươi ngon.",
    wayfindingTip: "Nằm trên triền đồi thoai thoải nhìn thẳng ra nhánh sông Đồng Nai và vùng đệm Vườn Quốc gia Cát Tiên.",
    audioDuration: "1 phút 50 giây",
    audioStory: "Chào mừng bạn đến với mái nhà ấm cúng của người Mạ. Tại đây, mỗi món ăn là một vị thuốc dân gian lấy trực tiếp từ cánh rừng Cát Tiên...",
    has3D: false,
    qrCodeValue: "VIET_HERITAGE_HOMESTAY_TALAI",
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "ben-thuyen-song-dong-nai",
    name: "Bến Thuyền Độc Mộc Tà Lài",
    category: "nature",
    categoryName: "Cảnh quan & Thiên nhiên",
    lat: 11.4518,
    lng: 107.3882,
    description: "Nơi du khách có thể trải nghiệm chèo thuyền gỗ độc mộc ngắm hoàng hôn buông trên mặt nước mênh mông của dòng sông Đồng Nai hùng vĩ.",
    wayfindingTip: "Đi xuôi dốc cầu treo Tà Lài khoảng 100m về phía hạ lưu, bến có cắm cờ hội và nhiều thuyền độc mộc neo đậu dưới rặng tre.",
    audioDuration: "2 phút 05 giây",
    audioStory: "Dòng sông Đồng Nai hiền hòa chảy qua bao đời buôn làng. Thuyền độc mộc được đục đẽo từ một thân cây gỗ sao nguyên khối...",
    has3D: true,
    model3DName: "Thuyền Độc Mộc Cổ",
    qrCodeValue: "VIET_HERITAGE_THUYEN_DOC_MOC",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
];
