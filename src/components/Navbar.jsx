import { useState, useEffect } from "react";

export default function Navbar({ userEmail }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDarkMode(saved);
    document.body.classList.toggle("dark", saved);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.body.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">🏠 IoT Dashboard</h2>
      <div className="navbar-right">
        <button onClick={toggleDarkMode} className="theme-btn">
          {darkMode ? "☀️" : "🌙"}
        </button>
        <div className="avatar">
          {userEmail ? (
            <span title={userEmail}>{userEmail.charAt(0).toUpperCase()}</span>
          ) : (
            <span>👤</span>
          )}
        </div>
      </div>
    </nav>
  );
}
