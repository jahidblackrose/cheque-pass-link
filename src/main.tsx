import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Sync theme with the user's device system preference (light/dark)
const applySystemTheme = (isDark: boolean) => {
  document.documentElement.classList.toggle("dark", isDark);
};

const mql = window.matchMedia("(prefers-color-scheme: dark)");
applySystemTheme(mql.matches);
mql.addEventListener("change", (e) => applySystemTheme(e.matches));

createRoot(document.getElementById("root")!).render(<App />);
