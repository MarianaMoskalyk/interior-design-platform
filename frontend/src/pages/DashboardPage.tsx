import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Clock, LogOut, Trash2, Box } from "lucide-react";

interface Project {
  id: string;
  title: string;
  updatedAt: string;
  roomArea: number;
}

export default function DashboardPage() {
  const navigate = useNavigate();

  // Стан списку проєктів (пізніше завантажуватиметься з NestJS API + PostgreSQL)
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Вітальня 25м²",
      updatedAt: "10.09.2026",
      roomArea: 24.5,
    },
    {
      id: "2",
      title: "Спальня в скандинавському стилі",
      updatedAt: "08.09.2026",
      roomArea: 16.0,
    },
  ]);

  const handleCreateNew = () => {
    const newId = Math.random().toString(36).substring(2, 9);
    navigate(`/editor/${newId}`);
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects((prev) => prev.filter((project) => project.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F1F2F5] text-slate-800 flex flex-col">
      {/* Шапка дашборду */}
      <header className="bg-white px-8 h-16 flex items-center justify-between shrink-0 shadow-[0_1px_0_rgba(15,23,42,0.06)]">
        <Link
          to="/"
          className="font-bold text-lg text-slate-900 flex items-center gap-2"
        >
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <Box className="w-4 h-4" />
          </div>
          <span>Особистий кабінет</span>
        </Link>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <Link
            to="/"
            className="flex items-center gap-1.5 hover:text-slate-900 transition"
          >
            <LogOut className="w-4 h-4" /> Вийти
          </Link>
        </div>
      </header>

      {/* Контент */}
      <main className="max-w-7xl mx-auto w-full px-8 py-10 flex-1">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Мої проєкти</h1>
            <p className="text-slate-500 text-sm mt-1">
              Керуйте своїми плануваннями та кошторисами
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-xl flex items-center gap-2 shadow-sm shadow-indigo-600/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Створити новий проєкт
          </button>
        </div>

        {/* Список проєктів (Grid) */}
        {projects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-[0_1px_3px_rgba(15,23,42,0.08)]">
            <Box className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">
              У вас поки немає збережених проєктів
            </p>
            <button
              onClick={handleCreateNew}
              className="mt-4 px-4 py-2 bg-indigo-600 text-xs font-medium text-white rounded-lg hover:bg-indigo-500 transition cursor-pointer"
            >
              Створити перший проєкт
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-2xl p-5 flex flex-col justify-between transition group shadow-[0_1px_3px_rgba(15,23,42,0.08)] hover:shadow-md"
              >
                <div>
                  <div className="w-full h-36 bg-[#F6F7F9] rounded-xl mb-4 flex items-center justify-center text-slate-300 group-hover:text-indigo-400 transition">
                    <Box className="w-12 h-12" />
                  </div>
                  <h3 className="font-semibold text-lg text-slate-800 group-hover:text-indigo-600 transition">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Площа: {project.roomArea} м²
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {project.updatedAt}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDeleteProject(project.id, e)}
                      className="p-1.5 bg-[#F1F2F5] hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition cursor-pointer"
                      title="Видалити проєкт"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => navigate(`/editor/${project.id}`)}
                      className="px-3 py-1.5 bg-[#F1F2F5] hover:bg-indigo-600 text-slate-700 hover:text-white rounded-lg transition cursor-pointer font-medium"
                    >
                      Відкрити
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
