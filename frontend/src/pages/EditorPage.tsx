import { useRoomStore } from "../store/roomStore";
import { screenToFloorPoint } from "../store/sceneBridge";
import Room3DScene from "./Room3DScene";
import ObjectInspector from "./ObjectInspector";
import { useState } from "react";
import {
  Box,
  Sofa,
  Image as ImageIcon,
  Sun,
  Calculator,
  Sparkles,
  Settings,
  Plus,
  Move,
  RotateCw,
  Maximize2,
  Eye,
  Camera,
  Search,
  ChevronRight,
  Send,
  Save,
  Bell,
  LayoutGrid,
} from "lucide-react";

// Типізація для категорій та вкладок
type CatalogTab = "furniture" | "materials" | "decor";
type RoomCategory = "living" | "bedroom" | "kitchen";

const NAV_ITEMS = [
  { key: "plan", label: "План приміщення", icon: LayoutGrid },
  { key: "3d", label: "3D Редактор", icon: Box },
  { key: "furniture", label: "Меблі та об'єкти", icon: Sofa },
  { key: "textures", label: "Текстури", icon: ImageIcon },
  { key: "lighting", label: "Освітлення", icon: Sun },
  { key: "estimate", label: "Кошторис", icon: Calculator },
  { key: "ai", label: "AI Рекомендації", icon: Sparkles },
  { key: "settings", label: "Налаштування", icon: Settings },
] as const;

export default function EditorPage() {
  // Стани навігації
  const [leftTab, setLeftTab] =
    useState<(typeof NAV_ITEMS)[number]["key"]>("3d");
  const [activeTab, setActiveTab] = useState<"3d" | "plan">("3d");
  const [rightTab, setRightTab] = useState<CatalogTab>("furniture");
  const [category, setCategory] = useState<RoomCategory>("living");
  const [selectedProject, setSelectedProject] = useState(1);
  const addObjectAt = useRoomStore((state) => state.addObjectAt);

  // Дані для каталогу об'єктів з чіткою типізацією
  const catalogItems: Record<CatalogTab, Record<RoomCategory, string[]>> = {
    furniture: {
      living: ["Диван", "Крісло", "Журнальний стіл", "Тумба під ТВ"],
      bedroom: ["Ліжко", "Шафа", "Приліжкова тумба", "Комод"],
      kitchen: [
        "Обідній стіл",
        "Стілець",
        "Кухонний гарнітур",
        "Барний стілець",
      ],
    },
    materials: {
      living: ["Паркет", "Ламінат", "Фарба для стін", "Шпалери"],
      bedroom: [
        "Ковролін",
        "Паркетна дошка",
        "Декоративна штукатурка",
        "Фарба",
      ],
      kitchen: ["Керамограніт", "Плитка", "Водостійка фарба", "Мозаїка"],
    },
    decor: {
      living: ["Люстра", "Картина", "Килим", "Ваза"],
      bedroom: ["Торшер", "Дзеркало", "Штори", "Подушки"],
      kitchen: ["Підвісний світильник", "Годинник", "Рослина", "Посуд"],
    },
  };

  const currentCatalogItems = catalogItems[rightTab]?.[category] || [];

  const handleNavClick = (key: (typeof NAV_ITEMS)[number]["key"]) => {
    setLeftTab(key);
    if (key === "3d" || key === "plan") setActiveTab(key);
    if (key === "furniture") setRightTab("furniture");
    if (key === "textures") setRightTab("materials");
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* 1. ВЕРХНІЙ НАВБАР */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Box size={20} />
          </div>
          <div>
            <h1 className="font-bold text-base leading-none text-slate-900">
              RoomPlan AI
            </h1>
            <p className="text-[11px] text-slate-500 mt-1">
              Проєктуй. Рахуй. Створи свій простір.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-1.5 text-slate-500">
            <Save size={14} />
            <span>Збережено в хмарі</span>
          </div>
          <button className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition">
            <Bell size={16} />
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-[11px]">
              М
            </div>
            <span className="hidden sm:inline text-slate-700">Мар'яна</span>
          </div>
        </div>
      </header>

      {/* ОСНОВНИЙ КОНТЕНТ */}
      <div className="flex flex-1 overflow-hidden bg-slate-50">
        {/* 2. ЛІВА ПАНЕЛЬ */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0">
          <div className="p-3 space-y-6 overflow-y-auto">
            <nav className="space-y-0.5">
              {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
                const active = leftTab === key;
                return (
                  <button
                    key={key}
                    onClick={() => handleNavClick(key)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition ${
                      active
                        ? "bg-indigo-600 text-white"
                        : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon
                      size={16}
                      className={active ? "text-white" : "text-slate-400"}
                    />
                    {label}
                  </button>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between px-1 mb-2">
                <span className="text-[11px] font-semibold text-slate-400 tracking-wide">
                  Проєкти
                </span>
                <button className="text-slate-400 hover:text-slate-900 transition">
                  <Plus size={14} />
                </button>
              </div>
              <div className="space-y-1.5">
                {[
                  { id: 1, title: "Квартира 68 м²", meta: "Сьогодні, 14:32" },
                  { id: 2, title: "Дім у стилі сканди", meta: "12.08.2025" },
                ].map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className={`p-2 rounded-lg border cursor-pointer flex gap-2.5 items-center transition ${
                      selectedProject === project.id
                        ? "bg-slate-100 border-slate-200"
                        : "hover:bg-slate-50 border-transparent"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-md bg-gradient-to-br from-indigo-100 to-slate-100 flex items-center justify-center shrink-0">
                      <Box size={16} className="text-indigo-500" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[13px] font-medium text-slate-800 truncate">
                        {project.title}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {project.meta}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-3 border-t border-slate-200">
            <button className="text-[12px] text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition">
              Усі проєкти <ChevronRight size={12} />
            </button>
          </div>
        </aside>

        {/* 3. ЦЕНТРАЛЬНА ЧАСТИНА */}
        <main className="flex-1 flex flex-col p-3 gap-3 overflow-y-auto">
          <div className="relative flex-1 rounded-xl border border-slate-200 overflow-hidden min-h-[380px] shadow-sm">
            {/* Панель інструментів на Canvas */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur border border-slate-200 rounded-lg p-1 flex flex-col gap-1 shadow-md z-10">
              {[
                { icon: Move, title: "Перемістити", active: true },
                { icon: RotateCw, title: "Повернути" },
                { icon: Maximize2, title: "Розгорнути" },
                { icon: Eye, title: "Переглянути" },
                { icon: Camera, title: "Зробити знімок" },
              ].map(({ icon: Icon, title, active }) => (
                <button
                  key={title}
                  title={title}
                  className={`p-2 rounded-md transition ${
                    active
                      ? "text-indigo-600 bg-indigo-50"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>

            {/* Перемикач видів 3D / План */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur border border-slate-200 rounded-lg p-1 flex items-center gap-1 shadow-md z-10">
              <button
                onClick={() => setActiveTab("3d")}
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  activeTab === "3d"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                3D
              </button>
              <button
                onClick={() => setActiveTab("plan")}
                className={`px-3 py-1 rounded text-xs font-medium transition ${
                  activeTab === "plan"
                    ? "bg-indigo-600 text-white"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                План
              </button>
            </div>

            {/* Вміст Canvas: 3D-режим монтує реальну сцену Three.js/R3F.
    План — поки що заглушка з тим самим grid-візерунком. */}
            {activeTab === "3d" ? (
              <div
                className="w-full h-full relative"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const type = e.dataTransfer.getData("text/plain");
                  if (!type) return;

                  const canvasEl = e.currentTarget.querySelector("canvas");
                  if (!canvasEl) return;

                  const point = screenToFloorPoint(
                    e.clientX,
                    e.clientY,
                    canvasEl,
                  );
                  if (point) addObjectAt(type, point);
                }}
              >
                <Room3DScene />
                <ObjectInspector />
              </div>
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center relative"
                style={{
                  backgroundColor: "#f8fafc",
                  backgroundImage:
                    "linear-gradient(rgba(99,102,241,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.08) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  backgroundPosition: "center",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at center, transparent 0%, #f8fafc 75%)",
                  }}
                />
                <div className="relative flex flex-col items-center gap-3 text-center px-6">
                  <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                    <LayoutGrid size={26} className="text-indigo-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">
                      План приміщення ще не побудований
                    </p>
                    <p className="text-xs text-slate-400 mt-1 max-w-[260px]">
                      Перейдіть у режим 3D, щоб задати стіни й межі кімнати.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-white/90 border border-slate-200 shadow-sm flex items-center justify-center text-[10px] font-semibold text-slate-400">
              XYZ
            </div>
          </div>

          {/* Віджети знизу — вирівняні по однаковій структурі: заголовок + акцент + деталі */}
          <div className="grid grid-cols-4 gap-3 h-56 shrink-0">
            <div
              onClick={() => setActiveTab("plan")}
              className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col cursor-pointer hover:border-slate-300 hover:shadow-sm transition"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-[13px] font-semibold text-slate-700">
                  План приміщення
                </span>
                <span className="text-[11px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                  68.0 м²
                </span>
              </div>
              <div className="flex-1 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center relative">
                <LayoutGrid size={32} className="text-slate-300" />
                <span className="absolute bottom-2 right-2 text-[10px] text-slate-400">
                  2D Схема
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-[13px] font-semibold text-slate-700">
                  Кошторис ремонту
                </span>
                <button className="text-[11px] text-indigo-600 hover:text-indigo-700">
                  Детально →
                </button>
              </div>
              <div className="text-xl font-bold text-slate-900 mb-3">
                147 820 грн
              </div>
              <div className="space-y-2 text-[12px]">
                <div className="flex justify-between text-slate-500">
                  <span>Чорнові роботи</span>
                  <span className="text-slate-700 font-medium">42 600 грн</span>
                </div>
                <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: "29%" }}
                  />
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Оздоблювальні матеріали</span>
                  <span className="text-slate-700 font-medium">56 300 грн</span>
                </div>
                <div className="h-1 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{ width: "38%" }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                <span className="text-[13px] font-semibold text-slate-700">
                  Матеріали
                </span>
                <button className="text-[11px] text-indigo-600 hover:text-indigo-700">
                  Відомість →
                </button>
              </div>
              <div className="text-xl font-bold text-slate-900 mb-3">
                142.3 м²
              </div>
              <div className="space-y-2.5 text-[12px]">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="truncate max-w-[130px]">
                    Плитка керамічна
                  </span>
                  <span className="text-slate-400">48.2 м²</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="truncate max-w-[130px]">Фарба для стін</span>
                  <span className="text-slate-400">28.5 м²</span>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50/60 border border-indigo-200 rounded-xl p-3 flex flex-col">
              <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-indigo-100 text-indigo-600">
                <Sparkles size={14} />
                <span className="text-[13px] font-semibold text-indigo-700">
                  AI Помічник
                </span>
              </div>
              <p className="text-[12px] text-slate-500 leading-relaxed flex-1">
                На основі параметрів вашої кімнати підбираємо найкращий дизайн.
              </p>
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Запитати AI..."
                  className="w-full bg-white border border-slate-200 rounded-lg pl-2.5 pr-8 py-1.5 text-[12px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-400"
                />
                <button className="absolute right-1.5 top-1.5 p-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded transition">
                  <Send size={10} />
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* 4. ПРАВА ПАНЕЛЬ */}
        <aside className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="p-3 border-b border-slate-200 space-y-3">
            <h2 className="text-sm font-semibold text-slate-800">
              Каталог об'єктів
            </h2>

            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
              {(["furniture", "materials", "decor"] as CatalogTab[]).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setRightTab(tab)}
                    className={`py-1.5 text-center text-[12px] font-medium rounded-md transition ${
                      rightTab === tab
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab === "furniture"
                      ? "Меблі"
                      : tab === "materials"
                        ? "Матеріали"
                        : "Декор"}
                  </button>
                ),
              )}
            </div>

            <div className="relative">
              <Search
                size={14}
                className="absolute left-2.5 top-2.5 text-slate-400"
              />
              <input
                type="text"
                placeholder="Пошук..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-indigo-400"
              />
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Підкатегорії */}
            <div className="w-24 border-r border-slate-200 p-2 space-y-1 text-[12px] overflow-y-auto shrink-0">
              {(
                [
                  { key: "living", label: "Вітальня" },
                  { key: "bedroom", label: "Спальня" },
                  { key: "kitchen", label: "Кухня" },
                ] as { key: RoomCategory; label: string }[]
              ).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`w-full text-left px-2 py-1.5 rounded transition ${
                    category === key
                      ? "bg-indigo-50 text-indigo-600 border-l-2 border-indigo-500 font-medium"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border-l-2 border-transparent"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Картки елементів каталогу */}
            <div className="flex-1 p-2.5 grid grid-cols-2 gap-2.5 overflow-y-auto content-start">
              {currentCatalogItems.map((item: string, index: number) => (
                <div
                  key={index}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("text/plain", item)
                  }
                  className="bg-white border border-slate-200 rounded-lg p-2.5 hover:border-indigo-300 hover:shadow-sm cursor-grab group transition flex flex-col items-center text-center"
                >
                  <div className="w-full aspect-square bg-slate-50 rounded-md mb-2 flex items-center justify-center">
                    {rightTab === "furniture" && (
                      <Sofa
                        size={30}
                        className="text-slate-400 group-hover:text-indigo-500 transition"
                      />
                    )}
                    {rightTab === "materials" && (
                      <ImageIcon
                        size={30}
                        className="text-slate-400 group-hover:text-indigo-500 transition"
                      />
                    )}
                    {rightTab === "decor" && (
                      <Sun
                        size={30}
                        className="text-slate-400 group-hover:text-indigo-500 transition"
                      />
                    )}
                  </div>
                  <span className="text-[12px] font-medium text-slate-600 group-hover:text-slate-900 truncate w-full">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
