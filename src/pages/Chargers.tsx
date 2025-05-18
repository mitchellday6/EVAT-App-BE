import { useState } from "react";
import axios from "../api/axios";

type Charger = {
  _id: string;
  latitude: number;
  longitude: number;
  connection_type?: string;
  distance: number;
};

const Chargers = () => {
  const [form, setForm] = useState({
    latitude: "",
    longitude: "",
    radius: "25",
    connection_type: "none"
  });
  const [chargers, setChargers] = useState<Charger[]>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fetchChargers = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/altChargers/nearby", {
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        radius: Number(form.radius),
        connection_type: form.connection_type
      });
      setChargers(res.data.chargers);
    } catch (err) {
      alert("Failed to fetch chargers. Check coordinates and radius.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Nearby Charging Stations</h2>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={form.latitude}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-40"
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={form.longitude}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-40"
        />
        <input
          type="text"
          name="radius"
          placeholder="Radius (km)"
          value={form.radius}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-40"
        />
        <select
          name="connection_type"
          value={form.connection_type}
          onChange={handleChange}
          className="border px-2 py-1 rounded w-40"
        >
          <option value="none">All Types</option>
          <option value="type2">Type 2</option>
          <option value="ccs">CCS</option>
          <option value="chademo">CHAdeMO</option>
        </select>
        <button
          onClick={fetchChargers}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>

      {chargers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full max-w-5xl table-auto border border-gray-300 shadow text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border-b">Charger ID</th>
                <th className="px-3 py-2 border-b">Latitude</th>
                <th className="px-3 py-2 border-b">Longitude</th>
                <th className="px-3 py-2 border-b">Type</th>
                <th className="px-3 py-2 border-b">Distance (km)</th>
              </tr>
            </thead>
            <tbody>
              {chargers.map((charger) => (
                <tr key={charger._id}>
                  <td className="px-3 py-2 border-b">{charger._id}</td>
                  <td className="px-3 py-2 border-b">{charger.latitude}</td>
                  <td className="px-3 py-2 border-b">{charger.longitude}</td>
                  <td className="px-3 py-2 border-b">{charger.connection_type || "N/A"}</td>
                  <td className="px-3 py-2 border-b">{charger.distance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {chargers.length === 0 && !loading && (
        <p className="text-gray-500 mt-4">No chargers found for the given location.</p>
      )}
    </div>
  );
};

export default Chargers;
