import { Navigate } from "react-router-dom"; // add this at the top
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";

import Login from "./pages/Login";
import Verify2FA from "./pages/Verify2FA";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Logs from "./pages/Logs";
import Insights from "./pages/Insights";
import UpdateCredentials from "./pages/UpdateCredentials";
import Chargers from "./pages/Chargers";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verify-2fa" element={<Verify2FA />} />
          <Route path="/" element={<Navigate to="/login" />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout><Dashboard /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Layout><Users /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/logs"
            element={
              <ProtectedRoute>
                <Layout><Logs /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/insights"
            element={
              <ProtectedRoute>
                <Layout><Insights /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-credentials"
            element={
              <ProtectedRoute>
                <Layout><UpdateCredentials /></Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chargers"
            element={
              <ProtectedRoute>
                <Layout><Chargers /></Layout>
              </ProtectedRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
