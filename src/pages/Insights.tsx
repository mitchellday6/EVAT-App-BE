import { useEffect, useState } from "react";
import { getInsights } from "../api/admin";

const Insights = () => {
  const [data, setData] = useState<{ totalUsers: number; totalVehicles: number }>({ totalUsers: 0, totalVehicles: 0 });

  useEffect(() => {
    const fetchInsights = async () => {
      const response = await getInsights();
      setData(response.data);
    };
    fetchInsights();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">System Insights</h2>
      <p>Total Users: <b>{data.totalUsers}</b></p>
      <p>Total Vehicles: <b>{data.totalVehicles}</b></p>
    </div>
  );
};

export default Insights;
