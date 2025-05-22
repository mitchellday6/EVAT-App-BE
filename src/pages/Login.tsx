import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api/admin";
import logo from "../assets/logo_chameleon(full).jpeg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  //const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Apply dark mode class to document
  /* useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
 */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginAdmin({ username, password });
      navigate("/verify-2fa", { state: { username } });
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 transition duration-300 bg-green-50 dark:bg-gray-900 dark:text-white">
      <div className="absolute top-4 right-4">
      </div>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white dark:bg-gray-800 border border-green-200 dark:border-gray-700 shadow-xl rounded-lg p-8 space-y-6"
      >
        <div className="flex flex-col items-center">
          <div className="bg-white p-3 rounded-full shadow mb-4">
            <img
              src={logo}
              alt="Chameleon Logo"
              className="w-24 h-24 object-contain"
            />
          </div>
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-300">
            Admin Login
          </h2>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-600"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-sm text-green-600 dark:text-green-300 hover:underline"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-4 py-2 font-semibold rounded-md transition duration-200 ${
            loading
              ? "bg-green-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          } text-white`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Sending...
            </span>
          ) : (
            "Send 2FA Code"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
