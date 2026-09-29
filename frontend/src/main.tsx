import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Імпорт глобальних стилів Tailwind
import "./App.css"; // Імпорт додаткових кастомних класів

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
