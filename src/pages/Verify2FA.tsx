import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verify2FA } from "../api/admin";
import { useAuth } from "../auth/AuthProvider";

const Verify2FA = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const username = location.state?.username;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await verify2FA({ username, code });
      login(response.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleVerify} className="w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold">Enter 2FA Code</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Enter Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Verify and Login
        </button>
      </form>
    </div>
  );
};

export default Verify2FA;
