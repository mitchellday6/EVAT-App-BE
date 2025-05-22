import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded-md font-medium transition ${
      location.pathname === path
        ? "bg-green-700 text-white"
        : "text-green-900 hover:bg-green-100"
    }`;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r shadow-inner min-h-screen p-6 space-y-6 animate-slide-in-left">
      <h2 className="text-2xl font-bold text-green-800 dark:text-green-100">EVAT Admin</h2>
      <nav className="space-y-2">
        <Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
        <Link to="/users" className={linkClass("/users")}>Users</Link>
        <Link to="/logs" className={linkClass("/logs")}>Logs</Link>
        <Link to="/insights" className={linkClass("/insights")}>Insights</Link>
        <Link to="/Chargers" className={linkClass("/Chargers")}>Get Chargers</Link>
        <Link to="/update-credentials" className={linkClass("/update-credentials")}>Update Credentials</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
