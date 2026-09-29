import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Calculator,
  Sparkles,
  Cloud,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Globe,
  User,
  Mail,
  Lock,
  ArrowRight,
  Eye,
  X,
  ChevronDown,
} from "lucide-react";

export default function HomePage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const openAuth = (registerMode: boolean) => {
    setIsRegister(registerMode);
    setIsAuthOpen(true);

    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-white text-slate-800 font-sans">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="h-[67px] px-6 sm:px-10 lg:px-14 flex items-center justify-between  bg-white border-b border-slate-100 shrink-0">
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white shadow-sm">
            <Box className="w-5 h-5" />
          </div>

          <div>
            <div className="text-[17px] font-bold text-slate-900 leading-tight">
              RoomPlan AI
            </div>

            <div className="text-[10px] text-slate-400 mt-0.5">
              Проєктуй. Рахуй. Створи свій простір.
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">
          {/* LANGUAGE */}
          <button className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-600 hover:text-indigo-600 transition">
            <Globe className="w-4 h-4 text-slate-700" />
            <span>UA</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          <span className="hidden md:block text-[10px] text-slate-400">
            Вже маєте акаунт?
          </span>

          <button
            onClick={() => openAuth(false)}
            className="px-4 py-2 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 text-[11px] font-semibold hover:bg-indigo-100 transition"
          >
            Увійти
          </button>
        </div>
      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}
      <main className="flex-1 min-h-0 flex flex-col overflow-hidden">
        {/* =====================================================
            HERO
        ===================================================== */}
        <section className="relative flex-1 min-h-0 overflow-hidden">
          {/* BACKGROUND IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85"
            alt="3D дизайн інтер'єру"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* LIGHT OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-[58%] to-white/10" />

          {/* CONTENT */}
          <div className="relative z-10 max-w-[1440px] w-full h-full mx-auto px-6 sm:px-10 lg:px-14 flex items-center">
            <div className="w-full lg:w-[55%]">
              {/* BADGE */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[11px] font-semibold mb-5">
                <Sparkles className="w-3.5 h-3.5" />

                <span>Інноваційна платформа для дизайну та ремонту</span>
              </div>

              {/* TITLE */}
              <h1 className="max-w-[620px] text-[36px] sm:text-[42px] lg:text-[48px] font-extrabold text-slate-900 leading-[1.12] tracking-tight">
                Плануйте свій простір
                <br />у 3D та отримуйте точний
                <br />
                кошторис
              </h1>

              {/* DESCRIPTION */}
              <p className="max-w-[530px] mt-5 text-[13px] sm:text-[16px] text-slate-500 leading-6">
                Створюйте 3D-проєкти, розставляйте меблі, змінюйте текстури, а
                ми порахуємо вартість ремонту, обсяги матеріалів та підкажемо
                кращі дизайнерські рішення за допомогою AI.
              </p>

              {/* BUTTON */}
              <button
                onClick={() => openAuth(true)}
                className="mt-6 inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white text-[13px] font-semibold shadow-lg shadow-indigo-200 transition"
              >
                Створити акаунт
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* AI BADGE */}
            <div className="absolute top-[95px] right-[12%] hidden xl:flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-xl border border-white shadow-md text-[10px] font-medium text-slate-600">
              <Sparkles className="w-4 h-4 text-indigo-600" />

              <span>
                AI-рекомендації
                <br />
                щодо дизайну
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            FEATURES
        ===================================================== */}
        <section className="bg-white border-t border-slate-100 shrink-0">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-4 xl:py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {/* FEATURE 1 */}
              <div className="px-5 lg:first:pl-0 py-3 lg:border-r border-slate-100">
                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                  <Box className="w-5 h-5" />
                </div>

                <h3 className="text-[18px] font-bold text-slate-900 leading-5 min-h-[40px]">
                  3D-планування
                  <br />
                  онлайн
                </h3>

                <p className="text-[13px] text-slate-400 leading-4 mt-1.5 max-w-[190px]">
                  Створюйте інтер'єр у браузері без встановлення програм.
                </p>
              </div>

              {/* FEATURE 2 */}
              <div className="px-5 py-3 lg:border-r border-slate-100">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <Calculator className="w-5 h-5" />
                </div>

                <h3 className="text-[18px] font-bold text-slate-900 leading-5 min-h-[40px]">
                  Точний кошторис
                  <br />і матеріали
                </h3>

                <p className="text-[13px] text-slate-400 leading-4 mt-1.5 max-w-[190px]">
                  Автоматичний розрахунок з урахуванням прорізів і коефіцієнта
                  підрізки.
                </p>
              </div>

              {/* FEATURE 3 */}
              <div className="px-5 py-3 lg:border-r border-slate-100">
                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>

                <h3 className="text-[18px] font-bold text-slate-900 leading-5 min-h-[40px]">
                  AI-консультант
                </h3>

                <p className="text-[13px] text-slate-400 leading-4 mt-1.5 max-w-[190px]">
                  Отримуйте персоналізовані рекомендації щодо стилю, ергономіки
                  та кольорів.
                </p>
              </div>

              {/* FEATURE 4 */}
              <div className="px-5 py-3 lg:pr-0">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Cloud className="w-5 h-5" />
                </div>

                <h3 className="text-[18px] font-bold text-slate-900 leading-5 min-h-[40px]">
                  Хмарне
                  <br />
                  збереження
                </h3>

                <p className="text-[13px] text-slate-400 leading-4 mt-1.5 max-w-[190px]">
                  Ваш проєкт завжди з вами на будь-якому пристрої.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FOOTER
        ===================================================== */}
        <footer className="border-t border-slate-100 bg-white shrink-0">
          <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-5 text-[9px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Ваші дані захищені
                </span>

                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Працюємо в хмарі
                </span>

                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5" />
                  Доступно з будь-якого пристрою
                </span>
              </div>

              <div className="text-[9px] text-slate-400">
                Краще планування — менше витрат — красивіший дім ♡
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* =====================================================
          AUTH SLIDE-OVER
      ===================================================== */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isAuthOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* BACKDROP */}
        <div
          className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px]"
          onMouseDown={closeAuth}
        />

        {/* PANEL */}
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-[430px] overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ease-out ${
            isAuthOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={closeAuth}
            className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* PANEL CONTENT */}
          <div className="px-7 sm:px-9 py-8">
            {/* TITLE */}
            <div className="mb-6 pr-8">
              <h2 className="text-[27px] font-extrabold text-slate-900">
                {isRegister ? "Реєстрація" : "Вхід"}
              </h2>

              <p className="mt-2 text-[12px] leading-5 text-slate-400">
                {isRegister
                  ? "Створіть свій акаунт, щоб почати проєктувати свій ідеальний простір"
                  : "Увійдіть до свого облікового запису RoomPlan AI"}
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {/* NAME */}
              {isRegister && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                    Ім'я
                  </label>

                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      type="text"
                      placeholder="Введіть ваше ім'я"
                      className="w-full h-[40px] pl-10 pr-3 rounded-lg border border-slate-200 bg-white text-[11px] text-slate-700 placeholder:text-slate-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition"
                    />
                  </div>
                </div>
              )}

              {/* SURNAME */}
              {isRegister && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                    Прізвище
                  </label>

                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      type="text"
                      placeholder="Введіть ваше прізвище"
                      className="w-full h-[40px] pl-10 pr-3 rounded-lg border border-slate-200 bg-white text-[11px] text-slate-700 placeholder:text-slate-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition"
                    />
                  </div>
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Email
                </label>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <input
                    type="email"
                    placeholder="Введіть вашу електронну пошту"
                    className="w-full h-[40px] pl-10 pr-3 rounded-lg border border-slate-200 bg-white text-[11px] text-slate-700 placeholder:text-slate-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Пароль
                </label>

                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Введіть пароль"
                    className="w-full h-[40px] pl-10 pr-10 rounded-lg border border-slate-200 bg-white text-[11px] text-slate-700 placeholder:text-slate-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              {isRegister && (
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                    Підтвердіть пароль
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Повторіть пароль"
                      className="w-full h-[40px] pl-10 pr-10 rounded-lg border border-slate-200 bg-white text-[11px] text-slate-700 placeholder:text-slate-300 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 transition"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* TERMS */}
              {isRegister && (
                <label className="flex items-start gap-2 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-0.5 accent-indigo-600 shrink-0"
                  />

                  <span className="text-[9px] text-slate-400 leading-4">
                    Я погоджуюсь з{" "}
                    <span className="text-indigo-500">
                      Умовами використання
                    </span>{" "}
                    та{" "}
                    <span className="text-indigo-500">
                      Політикою конфіденційності
                    </span>
                  </span>
                </label>
              )}

              {/* SUBMIT */}
              <Link
                to="/dashboard"
                onClick={closeAuth}
                className="w-full h-[40px] mt-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-semibold flex items-center justify-center gap-2 transition shadow-md shadow-indigo-100"
              >
                {isRegister ? "Зареєструватися" : "Увійти"}

                <ArrowRight className="w-4 h-4" />
              </Link>
            </form>

            {/* DIVIDER */}
            <div className="relative flex items-center my-5">
              <div className="w-full border-t border-slate-100" />

              <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-[10px] text-slate-400">
                або
              </span>
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              className="w-full h-[40px] rounded-lg border border-slate-200 hover:bg-slate-50 text-[10px] font-semibold text-slate-600 flex items-center justify-center gap-2 transition"
            >
              <span className="text-[15px] font-bold text-blue-500">G</span>
              Продовжити з Google
            </button>

            {/* SWITCH LOGIN / REGISTER */}
            <div className="text-center mt-5 text-[10px] text-slate-400">
              {isRegister ? "Вже маєте акаунт? " : "Ще не маєте акаунту? "}

              <button
                type="button"
                onClick={() => {
                  setIsRegister(!isRegister);
                  setShowPassword(false);
                  setShowConfirmPassword(false);
                }}
                className="text-indigo-600 font-semibold hover:text-indigo-700 transition"
              >
                {isRegister ? "Увійти" : "Зареєструватися"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
