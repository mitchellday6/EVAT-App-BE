import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path: string) =>
    `block px-2 py-1 rounded ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">EVAT Admin</h2>
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
