export interface HeritageArtifact {
  id: string;
  name: string;
  subTitle: string;
  category: string;
  era: string;
  material: string;
  dimension: string;
  keeper: string;
  description: string;
  culturalSignificance: string;
  modelUrl: string;
  audioStory: string;
  audioDuration: string;
  audioFileUrl: string;
  posterImage: string;
  arPlacement: "floor" | "wall";
  isCustomTexture?: boolean;
}

export const SAMPLE_ARTIFACTS: HeritageArtifact[] = [
  {
    id: "vay-tho-cam-xoe-ma",
    name: "Váy Thổ Cẩm Xếp Ly Hoa Văn Cổ",
    subTitle: "Nét Đẹp Tinh Hoa Dệt Thủ Công Của Phụ Nữ Bản Địa",
    category: "Trang Phục Di Sản Sống",
    era: "Hoa văn truyền thống lưu truyền qua nhiều đời",
    material: "Sợi bông tự nhiên, nhuộm chàm & vỏ cây rừng Cát Tiên",
    dimension: "Dáng xòe xếp nếp 360 độ, dệt khổ rộng",
    keeper: "Nghệ nhân Ka Bào (Làng Mạ, Tà Lài)",
    description: "Tác phẩm dệt thủ công độc bản với các dải hoa văn hình học, sóng nước, quả trám và các nếp gấp xòe quạt lộng lẫy. Mỗi đường kim mũi chỉ là kết tinh của hàng trăm giờ kiên nhẫn bên khung cửi.",
    culturalSignificance: "Đối với người phụ nữ Mạ, chiếc váy thổ cẩm xòe xếp ly là trang phục thiêng liêng nhất chỉ được mặc trong các ngày hội lớn của buôn làng: Lễ mừng lúa mới, ngày hội cồng chiêng và lễ tạ ơn thần Yang.",
    modelUrl: "/models/sample_artifact.glb",
    audioDuration: "2 phút 40 giây",
    audioStory: "Mỗi đường chỉ màu đỏ, vàng, chàm mà bạn đang chiêm ngưỡng trên mô hình 3D được lấy hoàn toàn từ nhựa cây và củ rừng tự nhiên. Hãy ngắm nhìn các nếp gấp xòe quạt uyển chuyển theo từng bước chân của thiếu nữ Làng Mạ...",
    audioFileUrl: "/intro_lang_ma.mp4",
    posterImage: "/tho_cam_mau.jpg",
    arPlacement: "floor",
    isCustomTexture: true,
  },
  {
    id: "khung-cui-det-ma",
    name: "Khung Cửi Dệt Thổ Cẩm Cổ Truyền",
    subTitle: "Nhịp Thoi Đại Ngàn Lưu Giữ Tri Thức Bản Địa",
    category: "Nghề Thủ Công Truyền Thống",
    era: "Thế kỷ XIX - Lưu truyền qua 4 thế hệ",
    material: "Gỗ căm xe rừng Cát Tiên, tre nứa & sợi bông tự nhiên",
    dimension: "Dài 1.6m x Rộng 0.8m x Cao 0.9m",
    keeper: "Nghệ nhân Ka Bào (Làng Mạ, Tà Lài)",
    description: "Khung dệt thô sơ của người Mạ được cố định bằng chính đôi chân và vòng đai lưng của người phụ nữ khi ngồi dệt. Mỗi hoa văn là mật mã kể về mối giao hòa giữa con người và thần rừng Yang.",
    culturalSignificance: "Phụ nữ Mạ từ năm 12 tuổi đã được mẹ truyền dạy kỹ thuật dệt và cách nhận biết các loài vỏ cây trong rừng để nhuộm màu. Tấm thổ cẩm dệt ra là của hồi môn thiêng liêng khi về nhà chồng.",
    modelUrl: "/models/sample_artifact.glb",
    audioDuration: "2 phút 40 giây",
    audioStory: "Mỗi tiếng lách cách của khung cửi là nhịp thở của thời gian. Hãy nhắm mắt lại và lắng nghe thanh âm của cánh rừng Cát Tiên đang hòa vào từng sợi chỉ ngũ sắc...",
    audioFileUrl: "/intro_lang_ma.mp4",
    posterImage: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    arPlacement: "floor",
  },
  {
    id: "bo-chieng-thieng-ma",
    name: "Bộ Cồng Chiêng Thiêng 6 Chiếc",
    subTitle: "Cầu Nối Tâm Linh Giữa Buôn Làng Và Thần Yang",
    category: "Không Gian Văn Hóa Cồng Chiêng",
    era: "Được đúc từ hợp kim đồng cổ truyền",
    material: "Đồng thau pha bạc & vàng non",
    dimension: "Đường kính từ 25cm đến 60cm",
    keeper: "Già làng K'Tư (Nhà sinh hoạt cộng đồng Tà Lài)",
    description: "Bộ chiêng của người Mạ gồm 6 chiếc với các cao độ khác nhau, mô phỏng các thế hệ trong một gia đình: Chiêng Mẹ (lớn nhất, giữ nhịp), Chiêng Cha, và các Chiêng Con.",
    culturalSignificance: "Trong tín ngưỡng người Mạ, mỗi chiếc chiêng đều có một vị thần Yang cư ngụ. Chiêng càng cổ thì quyền uy và sự linh thiêng càng lớn.",
    modelUrl: "/models/sample_artifact.glb",
    audioDuration: "3 phút 15 giây",
    audioStory: "Tiếng chiêng Mạ vang lên không phải để phô trương, mà là lời thầm thì gửi lên bầu trời. Khi tiếng cồng cất lên, muôn loài trong rừng Cát Tiên dường như dừng bước lắng nghe...",
    audioFileUrl: "/intro_lang_ma.mp4",
    posterImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    arPlacement: "floor",
  },
];
