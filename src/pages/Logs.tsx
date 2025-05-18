import { useEffect, useState } from "react";
import { getLogs } from "../api/admin";

const Logs = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await getLogs();
      setLogs(response.data);
    };
    fetchLogs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Admin Logs</h2>
      <ul className="list-disc list-inside">
        {logs.map((log, idx) => (
          <li key={idx}>{`${log.user} - ${log.action} @ ${new Date(log.timestamp).toLocaleString()}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;