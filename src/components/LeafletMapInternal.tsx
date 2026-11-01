"use client";

import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Checkpoint } from "@/data/checkpoints";

// Cấu hình icon ghim phong cách di sản
const createCustomIcon = (isSelected: boolean, category: string) => {
  let color = "#15803d"; // xanh lá mặc định
  if (category === "craft") color = "#b91c1c"; // đỏ thổ cẩm
  if (category === "homestay") color = "#b45309"; // cam ấm
  if (category === "nature") color = "#0369a1"; // xanh suối

  const size = isSelected ? 38 : 30;

  return L.divIcon({
    className: "custom-leaflet-marker",
    html: `
      <div style="
        background-color: ${color};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #ffffff;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
      ">
        <div style="
          width: 10px;
          height: 10px;
          background: #ffffff;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

function ChangeMapView({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, 16, { duration: 1.2 });
  }, [coords, map]);
  return null;
}

interface LeafletMapInternalProps {
  checkpoints: Checkpoint[];
  selectedId?: string;
  onSelect: (cp: Checkpoint) => void;
}

export default function LeafletMapInternal({
  checkpoints,
  selectedId,
  onSelect,
}: LeafletMapInternalProps) {
  const selectedPoint = checkpoints.find((p) => p.id === selectedId) || checkpoints[0];
  const center: [number, number] = [11.4552, 107.3912]; // Tâm điểm Làng Mạ Tà Lài

  return (
    <div className="w-full h-[450px]">
      <MapContainer
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {selectedId && selectedPoint && (
          <ChangeMapView coords={[selectedPoint.lat, selectedPoint.lng]} />
        )}

        {checkpoints.map((cp) => {
          const isSelected = cp.id === selectedId;
          return (
            <Marker
              key={cp.id}
              position={[cp.lat, cp.lng]}
              icon={createCustomIcon(isSelected, cp.category)}
              eventHandlers={{
                click: () => onSelect(cp),
              }}
            >
              <Popup>
                <div className="p-1 space-y-1.5 max-w-[220px]">
                  <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {cp.categoryName}
                  </span>
                  <h4 className="font-bold text-xs text-stone-900 leading-tight">{cp.name}</h4>
                  <p className="text-[11px] text-stone-600 line-clamp-2">{cp.description}</p>
                  
                  <div className="pt-1.5 border-t border-stone-200 text-[10px] text-amber-900 font-medium">
                    📌 <strong>Mốc nhận diện:</strong> {cp.wayfindingTip}
                  </div>

                  <button
                    onClick={() => onSelect(cp)}
                    className="w-full mt-1 bg-emerald-800 text-amber-50 text-[11px] font-bold py-1 rounded shadow-sm hover:bg-emerald-900"
                  >
                    Nghe Thuyết Minh & Xem 3D
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
