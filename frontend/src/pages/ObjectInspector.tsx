import { Trash2 } from "lucide-react";
import { useRoomStore } from "../store/roomStore";

const COLOR_PRESETS = [
  "#818cf8", // indigo
  "#f59e0b", // amber
  "#10b981", // emerald
  "#ef4444", // rose
  "#64748b", // slate
  "#a855f7", // purple
  "#0ea5e9", // sky
  "#78350f", // wood brown
];

export default function ObjectInspector() {
  const objects = useRoomStore((s) => s.objects);
  const selectedId = useRoomStore((s) => s.selectedId);
  const updateObjectColor = useRoomStore((s) => s.updateObjectColor);
  const updateObjectScale = useRoomStore((s) => s.updateObjectScale);
  const removeObject = useRoomStore((s) => s.removeObject);
  const selectObject = useRoomStore((s) => s.selectObject);

  const selected = objects.find((o) => o.id === selectedId);
  if (!selected) return null;

  return (
    <div className="absolute top-4 right-4 w-56 bg-white rounded-xl shadow-lg p-4 z-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[13px] font-semibold text-slate-800">
          {selected.type}
        </span>
        <button
          onClick={() => removeObject(selected.id)}
          className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded transition"
          title="Видалити об'єкт"
        >
          <Trash2 size={14} />
        </button>
      </div>

      <div className="mb-4">
        <p className="text-[11px] text-slate-500 mb-1.5">Колір</p>
        <div className="grid grid-cols-4 gap-1.5">
          {COLOR_PRESETS.map((color) => (
            <button
              key={color}
              onClick={() => updateObjectColor(selected.id, color)}
              className={`w-full aspect-square rounded-md transition ${
                selected.color === color
                  ? "ring-2 ring-offset-1 ring-indigo-500"
                  : ""
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[11px] text-slate-500">Розмір</p>
          <span className="text-[11px] text-slate-400">
            {selected.scale.toFixed(1)}×
          </span>
        </div>
        <input
          type="range"
          min={0.5}
          max={2}
          step={0.1}
          value={selected.scale}
          onChange={(e) =>
            updateObjectScale(selected.id, Number(e.target.value))
          }
          className="w-full accent-indigo-600"
        />
      </div>

      <button
        onClick={() => selectObject(null)}
        className="w-full text-[11px] text-slate-400 hover:text-slate-600 transition"
      >
        Закрити
      </button>
    </div>
  );
}
