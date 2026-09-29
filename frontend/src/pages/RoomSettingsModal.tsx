import { useState } from "react";
import { X } from "lucide-react";
import { useRoomStore } from "../store/roomStore";

interface Props {
  onClose: () => void;
}

export default function RoomSettingsModal({ onClose }: Props) {
  const dimensions = useRoomStore((s) => s.dimensions);
  const setDimensions = useRoomStore((s) => s.setDimensions);

  const [width, setWidth] = useState(dimensions.width);
  const [depth, setDepth] = useState(dimensions.depth);
  const [wallHeight, setWallHeight] = useState(dimensions.wallHeight);

  const handleSave = () => {
    setDimensions({ width, depth, wallHeight });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-[2px] flex items-center justify-center"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[360px] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-semibold text-slate-800">
            Розміри приміщення
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-slate-600 mb-1">
              Ширина (м)
            </label>
            <input
              type="number"
              min={2}
              max={20}
              step={0.1}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full h-[38px] px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-600 mb-1">
              Довжина (м)
            </label>
            <input
              type="number"
              min={2}
              max={20}
              step={0.1}
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              className="w-full h-[38px] px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-[12px] font-medium text-slate-600 mb-1">
              Висота стелі (м)
            </label>
            <input
              type="number"
              min={2}
              max={4}
              step={0.1}
              value={wallHeight}
              onChange={(e) => setWallHeight(Number(e.target.value))}
              className="w-full h-[38px] px-3 rounded-lg border border-slate-200 text-[13px] focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="text-[12px] text-slate-400 pt-1">
            Площа: {(width * depth).toFixed(1)} м²
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full h-[40px] mt-6 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold transition"
        >
          Застосувати
        </button>
      </div>
    </div>
  );
}
