import { useState } from "react";
import {
  Box,
  Sofa,
  Image as ImageIcon,
  Sun,
  Search,
  Plus,
  Pencil,
  Trash2,
  ShieldCheck,
  LayoutGrid,
  Layers,
} from "lucide-react";

type CatalogKind = "objects" | "materials";
type RoomCategory = "living" | "bedroom" | "kitchen";

interface CatalogItem {
  id: string;
  name: string;
  category: RoomCategory;
  subtype: string;
  price: string;
}

const ROOM_LABELS: Record<RoomCategory, string> = {
  living: "Вітальня",
  bedroom: "Спальня",
  kitchen: "Кухня",
};

const OBJECTS: CatalogItem[] = [
  { id: "o1", name: "Диван", category: "living", subtype: "Меблі", price: "18 500 грн" },
  { id: "o2", name: "Крісло", category: "living", subtype: "Меблі", price: "7 200 грн" },
  { id: "o3", name: "Журнальний стіл", category: "living", subtype: "Меблі", price: "4 100 грн" },
  { id: "o4", name: "Ліжко", category: "bedroom", subtype: "Меблі", price: "14 300 грн" },
  { id: "o5", name: "Шафа", category: "bedroom", subtype: "Меблі", price: "12 900 грн" },
  { id: "o6", name: "Кухонний гарнітур", category: "kitchen", subtype: "Меблі", price: "42 000 грн" },
  { id: "o7", name: "Люстра", category: "living", subtype: "Декор", price: "3 400 грн" },
  { id: "o8", name: "Торшер", category: "bedroom", subtype: "Декор", price: "1 850 грн" },
];

const MATERIALS: CatalogItem[] = [
  { id: "m1", name: "Паркет дубовий", category: "living", subtype: "Підлога", price: "1 250 грн/м²" },
  { id: "m2", name: "Ламінат", category: "bedroom", subtype: "Підлога", price: "480 грн/м²" },
  { id: "m3", name: "Фарба для стін", category: "living", subtype: "Стіни", price: "310 грн/л" },
  { id: "m4", name: "Шпалери флізелінові", category: "bedroom", subtype: "Стіни", price: "620 грн/рулон" },
  { id: "m5", name: "Керамограніт", category: "kitchen", subtype: "Підлога", price: "890 грн/м²" },
  { id: "m6", name: "Плитка кахельна", category: "kitchen", subtype: "Стіни", price: "540 грн/м²" },
];

export default function AdminPage() {
  const [activeCatalog, setActiveCatalog] = useState<CatalogKind>("objects");
  const [categoryFilter, setCategoryFilter] = useState<RoomCategory | "all">("all");
  const [search, setSearch] = useState("");

  const items = activeCatalog === "objects" ? OBJECTS : MATERIALS;
  const filtered = items.filter((item) => {
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen w-screen bg-[#F1F2F5] text-slate-800 font-sans overflow-hidden">
      {/* ЛІВА ПАНЕЛЬ */}
      <aside className="w-64 bg-white flex flex-col justify-between shrink-0 shadow-[1px_0_0_rgba(15,23,42,0.06)]">
        <div className="p-4">
          <div className="flex items-center gap-3 px-1 mb-8">
            <div className="bg-indigo-600 p-2 rounded-lg text-white">
              <Box size={18} />
            </div>
            <div>
              <div className="font-bold text-[15px] leading-none text-slate-900">
                RoomPlan AI
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Адмін-панель</div>
            </div>
          </div>

          <nav className="space-y-0.5">
            <button
              onClick={() => setActiveCatalog("objects")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition ${
                activeCatalog === "objects"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Sofa size={16} className={activeCatalog === "objects" ? "text-indigo-500" : "text-slate-400"} />
              Каталог об'єктів
            </button>
            <button
              onClick={() => setActiveCatalog("materials")}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition ${
                activeCatalog === "materials"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <Layers size={16} className={activeCatalog === "materials" ? "text-indigo-500" : "text-slate-400"} />
              Каталог матеріалів
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shrink-0">
            <ShieldCheck size={14} />
          </div>
          <div className="overflow-hidden">
            <p className="text-[12px] font-medium text-slate-700 truncate">Адміністратор</p>
            <p className="text-[11px] text-slate-400 truncate">admin@roomplan.ai</p>
          </div>
        </div>
      </aside>

      {/* ОСНОВНИЙ КОНТЕНТ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white flex items-center justify-between px-6 shrink-0 shadow-[0_1px_0_rgba(15,23,42,0.06)]">
          <h1 className="text-[15px] font-semibold text-slate-800">
            {activeCatalog === "objects" ? "Каталог об'єктів" : "Каталог матеріалів"}
          </h1>
          <button className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[12px] font-medium transition">
            <Plus size={14} />
            {activeCatalog === "objects" ? "Додати об'єкт" : "Додати матеріал"}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* ФІЛЬТРИ */}
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Пошук за назвою..."
                className="w-full bg-white rounded-lg pl-8 pr-3 py-1.5 text-[12px] text-slate-700 placeholder-slate-400 shadow-[0_1px_3px_rgba(15,23,42,0.08)] focus:outline-none focus:ring-1 focus:ring-indigo-300"
              />
            </div>

            <div className="flex items-center gap-1 bg-white p-1 rounded-lg shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
              <button
                onClick={() => setCategoryFilter("all")}
                className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition ${
                  categoryFilter === "all" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Усі кімнати
              </button>
              {(Object.keys(ROOM_LABELS) as RoomCategory[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setCategoryFilter(key)}
                  className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition ${
                    categoryFilter === key ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {ROOM_LABELS[key]}
                </button>
              ))}
            </div>
          </div>

          {/* ТАБЛИЦЯ КАТАЛОГУ */}
          <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] text-slate-400">
                  <th className="font-medium px-5 py-3">Назва</th>
                  <th className="font-medium px-5 py-3">Кімната</th>
                  <th className="font-medium px-5 py-3">Тип</th>
                  <th className="font-medium px-5 py-3">Ціна</th>
                  <th className="font-medium px-5 py-3 w-20 text-right">Дії</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id} className="border-t border-slate-50 hover:bg-slate-50/60 transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#F6F7F9] flex items-center justify-center shrink-0">
                          {activeCatalog === "objects" ? (
                            item.subtype === "Декор" ? (
                              <Sun size={14} className="text-slate-400" />
                            ) : (
                              <Sofa size={14} className="text-slate-400" />
                            )
                          ) : (
                            <ImageIcon size={14} className="text-slate-400" />
                          )}
                        </div>
                        <span className="text-[13px] font-medium text-slate-700">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-[13px] text-slate-500">{ROOM_LABELS[item.category]}</td>
                    <td className="px-5 py-3">
                      <span className="text-[11px] font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                        {item.subtype}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-[13px] text-slate-700 font-medium">{item.price}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition">
                          <Pencil size={14} />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-md transition">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center">
                      <LayoutGrid size={28} className="text-slate-300 mx-auto mb-2" />
                      <p className="text-[13px] text-slate-400">
                        Нічого не знайдено за цим фільтром
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}