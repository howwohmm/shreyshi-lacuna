import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Lacuna } from "./pages/Lacuna";
import { CursorFlower } from "./components/CursorFlower";
import { LoadingScreen } from "./components/LoadingScreen";
import "./index.css";

const App = () => {
  // light is the default (no nocturne); dark is preserved as a toggle
  const [theme, setTheme] = useState<"light" | "dark">(
    () => (typeof localStorage !== "undefined" && (localStorage.getItem("theme") as "light" | "dark")) || "light"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <BrowserRouter>
      <LoadingScreen />
      <div className="mesh-bg" />
      <CursorFlower />
      <Routes>
        <Route path="/" element={<Home theme={theme} onToggleTheme={toggle} />} />
        <Route path="/lacuna" element={<Lacuna theme={theme} onToggleTheme={toggle} />} />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
