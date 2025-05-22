import Sidebar from "./Sidebar";
import { useTheme } from "../context/ThemeContext";
import logo from "../assets/logo_chameleon.jpeg";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="flex min-h-screen bg-green-50 dark:bg-gray-900 text-gray-800 dark:text-white font-sans transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col animate-fade-in">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-green-100 dark:border-gray-700 shadow px-6 py-4 flex items-center justify-between">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="shrink-0 w-10 h-10 rounded-full overflow-hidden border border-green-300 shadow-sm bg-white flex items-center justify-center">
              <img
                src={logo}
                alt="Chameleon Logo"
                className="max-w-[90%] max-h-[90%] object-contain"
              />
            </div>
            <div className="text-xl font-semibold text-green-800 dark:text-green-200">
              EVAT Admin Panel
            </div>
          </div>

          {/* Controls */}
          <div className="space-x-2">
            <button
              onClick={toggleDarkMode}
              className="text-sm bg-green-100 dark:bg-green-700 text-green-800 dark:text-white hover:bg-green-200 dark:hover:bg-green-600 px-3 py-1 rounded transition"
            >
              {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 bg-green-50 dark:bg-gray-900 transition-colors animate-fade-in-up">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
