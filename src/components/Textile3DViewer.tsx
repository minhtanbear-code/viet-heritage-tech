"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCcw, Sparkles, Smartphone, Eye, Layers } from "lucide-react";

interface Textile3DViewerProps {
  textureUrl: string;
  name: string;
  category: string;
}

export default function Textile3DViewer({
  textureUrl,
  name,
  category,
}: Textile3DViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [modelType, setModelType] = useState<"skirt" | "roll" | "panel">("skirt");

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4.2;
    camera.position.y = 0.3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 2. Ánh sáng studio làm nổi bật sợi dệt
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5e6, 2.0);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xbde0fe, 1.0);
    dirLight2.position.set(-5, -3, -2);
    scene.add(dirLight2);

    // 3. Texture Loader áp tấm ảnh dệt thổ cẩm thật của người dùng
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(textureUrl);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1.5, 1);

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.8,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    // 4. Geometry theo lựa chọn mô phỏng
    let geometry: THREE.BufferGeometry;
    if (modelType === "skirt") {
      // Mô phỏng Váy Xòe Thổ Cẩm uốn lượn xếp ly như trong ảnh thực tế
      geometry = new THREE.CylinderGeometry(0.7, 1.5, 2.2, 48, 16, true);
      // Tạo hiệu ứng xếp nếp vải (pleats)
      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const y = pos.getY(i);
        const angle = Math.atan2(pos.getZ(i), pos.getX(i));
        const radius = Math.sqrt(pos.getX(i) * pos.getX(i) + pos.getZ(i) * pos.getZ(i));
        // Thêm nếp gấp uốn lượn dựa trên góc
        const wave = Math.sin(angle * 18) * 0.05 * (1 - y / 2.2);
        pos.setX(i, (radius + wave) * Math.cos(angle));
        pos.setZ(i, (radius + wave) * Math.sin(angle));
      }
      geometry.computeVertexNormals();
    } else if (modelType === "roll") {
      // Mô phỏng Cuộn Vải Thổ Cẩm
      geometry = new THREE.CylinderGeometry(0.5, 0.5, 2.4, 32);
    } else {
      // Mô phỏng Tấm Dệt Trải Phẳng (Tapestry Banner)
      geometry = new THREE.PlaneGeometry(2.4, 1.8, 16, 16);
      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        pos.setZ(i, Math.sin(x * 3) * 0.08); // Hiệu ứng lượn sóng vải mềm
      }
      geometry.computeVertexNormals();
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = 0.5;
    scene.add(mesh);

    // 5. Tương tác chuột kéo xoay 360 độ
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      mesh.rotation.y += deltaX * 0.01;
      mesh.rotation.x += deltaY * 0.005;

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support cho điện thoại
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;

      mesh.rotation.y += deltaX * 0.01;
      mesh.rotation.x += deltaY * 0.005;

      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    dom.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    // 6. Animation loop (Tự động xoay chậm)
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isDragging) {
        mesh.rotation.y += 0.006; // Tự động xoay nhẹ nhàng
      }
      renderer.render(scene, camera);
    };
    animate();

    // 7. Resize handling
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      dom.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      dom.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [textureUrl, modelType]);

  return (
    <div className="relative w-full h-[450px] sm:h-[500px] bg-gradient-to-b from-stone-900 via-stone-850 to-stone-950 rounded-2xl overflow-hidden border-2 border-amber-600/40 shadow-2xl flex flex-col justify-between p-4 outdoor-card">
      {/* 🏷️ HEADER THÔNG TIN HIỆN VẬT */}
      <div className="z-10 flex items-start justify-between w-full pointer-events-none">
        <div className="bg-stone-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-700 text-left shadow-lg pointer-events-auto">
          <span className="text-[10px] font-extrabold uppercase text-amber-400 tracking-wider block">
            {category}
          </span>
          <span className="text-xs sm:text-sm font-bold text-stone-100 block">
            {name}
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">
            ✨ Số hóa 3D trực tiếp từ hoa văn dệt thực tế
          </span>
        </div>

        {/* Chuyển đổi dáng 3D (Váy xòe xếp ly / Tấm thổ cẩm phẳng / Cuộn vải) */}
        <div className="flex items-center space-x-1 bg-stone-900/90 backdrop-blur-md p-1 rounded-xl border border-stone-700 pointer-events-auto text-[11px] font-bold">
          <button
            onClick={() => setModelType("skirt")}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              modelType === "skirt"
                ? "bg-amber-500 text-stone-950 shadow"
                : "text-stone-300 hover:text-white"
            }`}
          >
            Váy Xếp Ly
          </button>
          <button
            onClick={() => setModelType("panel")}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              modelType === "panel"
                ? "bg-amber-500 text-stone-950 shadow"
                : "text-stone-300 hover:text-white"
            }`}
          >
            Tấm Dệt Phẳng
          </button>
          <button
            onClick={() => setModelType("roll")}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              modelType === "roll"
                ? "bg-amber-500 text-stone-950 shadow"
                : "text-stone-300 hover:text-white"
            }`}
          >
            Cuộn Thổ Cẩm
          </button>
        </div>
      </div>

      {/* 🔮 CANVAS CHỨA MÔ HÌNH 3D XOAY 360 ĐỘ */}
      <div
        ref={mountRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full flex items-center justify-center"
      ></div>

      {/* 🧭 FOOTER HƯỚNG DẪN TƯƠNG TÁC */}
      <div className="z-10 flex items-center justify-between w-full pointer-events-none text-[11px] text-stone-300 bg-stone-900/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-stone-800">
        <span className="flex items-center space-x-1.5">
          <RotateCcw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
          <span>Kéo chuột hoặc vuốt ngón tay để <strong>xoay 360°</strong> ngắm từng thớ vải & nếp gấp</span>
        </span>
        <span className="hidden sm:inline text-amber-300 font-bold">WebGL 3D Render • Siêu nhẹ &lt; 800KB</span>
      </div>
    </div>
  );
}
