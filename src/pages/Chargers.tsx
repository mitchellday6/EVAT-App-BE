import { useEffect, useState } from "react";
import axios from "../api/axios";

type Station = {
  _id: string;
  operator?: string;
  connection_type?: string;
  current_type?: string;
  location: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
};

const Chargers = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Omit<Station, "_id" | "location">>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newStation, setNewStation] = useState({
    operator: "",
    connection_type: "",
    current_type: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    fetchStations();
  }, []);

  const fetchStations = async () => {
    try {
      const res = await axios.get("/admin/stations", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStations(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch stations:", err);
      setStations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this station?")) return;
    try {
      await axios.delete(`/admin/stations/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStations((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert("Failed to delete station.");
    }
  };

  const startEdit = (station: Station) => {
    setEditingId(station._id);
    setEditForm({
      operator: station.operator,
      connection_type: station.connection_type,
      current_type: station.current_type,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id: string) => {
    try {
      const res = await axios.put(`/admin/stations/${id}`, editForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setStations((prev) => prev.map((s) => (s._id === id ? res.data : s)));
      cancelEdit();
    } catch (err) {
      alert("Failed to update station.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleAddChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewStation({ ...newStation, [e.target.name]: e.target.value });
  };

  const handleAddStation = async () => {
    try {
      await axios.post(
        "/admin/stations",
        {
          operator: newStation.operator,
          connection_type: newStation.connection_type,
          current_type: newStation.current_type,
          location: {
            type: "Point",
            coordinates: [
              parseFloat(newStation.longitude),
              parseFloat(newStation.latitude),
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNewStation({
        operator: "",
        connection_type: "",
        current_type: "",
        latitude: "",
        longitude: "",
      });
      setShowAddForm(false);
      fetchStations();
    } catch (err) {
      console.error(err);
      alert("Failed to add charging station.");
    }
  };

  const filteredStations = stations.filter((station) => {
    const matchesSearch = station.operator?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterType === "all" || station.connection_type?.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });

  const uniqueTypes = Array.from(new Set(stations.map((s) => s.connection_type))).filter(Boolean);

  return (
    <div className="animate-fade-in">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-green-800 dark:text-green-100">
          Admin: Charging Station Management
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          {showAddForm ? "Cancel" : "➕ Add Charger"}
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by operator"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-white w-64"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-white"
        >
          <option value="all">All Types</option>
          {uniqueTypes.map((type) => (
            <option key={type} value={type.toLowerCase()}>{type}</option>
          ))}
        </select>
      </div>

      {/* Add Station Form */}
      {showAddForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddStation();
          }}
          className="mb-6 p-4 border rounded bg-white dark:bg-gray-800 shadow space-y-3"
        >
          {["operator", "connection_type", "current_type", "latitude", "longitude"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                {field.replace("_", " ")}
              </label>
              <input
                type={field === "latitude" || field === "longitude" ? "number" : "text"}
                name={field}
                placeholder={`Enter ${field}`}
                value={newStation[field as keyof typeof newStation]}
                onChange={handleAddChange}
                className="w-full border px-3 py-2 rounded dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      )}

      {/* Table */}
      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading stations...</p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="w-full table-auto border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm">
            <thead className="bg-green-100 dark:bg-green-700 text-green-900 dark:text-white">
              <tr>
                <th className="px-4 py-2 border-b">Operator</th>
                <th className="px-4 py-2 border-b">Connection Type</th>
                <th className="px-4 py-2 border-b">Current Type</th>
                <th className="px-4 py-2 border-b">Latitude</th>
                <th className="px-4 py-2 border-b">Longitude</th>
                <th className="px-4 py-2 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No stations match your filters.
                  </td>
                </tr>
              ) : (
                filteredStations.map((station) => {
                  const [lng, lat] = station.location?.coordinates || ["—", "—"];
                  return (
                    <tr key={station._id}>
                      <td className="px-4 py-2 border-b">
                        {editingId === station._id ? (
                          <input
                            type="text"
                            name="operator"
                            value={editForm.operator || ""}
                            onChange={handleChange}
                            className="border px-2 py-1 w-full rounded"
                          />
                        ) : (
                          station.operator || <span className="italic text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-2 border-b">
                        {editingId === station._id ? (
                          <input
                            type="text"
                            name="connection_type"
                            value={editForm.connection_type || ""}
                            onChange={handleChange}
                            className="border px-2 py-1 w-full rounded"
                          />
                        ) : (
                          station.connection_type || <span className="italic text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-2 border-b">{station.current_type || "—"}</td>
                      <td className="px-4 py-2 border-b">{lat ?? "—"}</td>
                      <td className="px-4 py-2 border-b">{lng ?? "—"}</td>
                      <td className="px-4 py-2 border-b text-center space-x-2">
                        {editingId === station._id ? (
                          <>
                            <button
                              onClick={() => saveEdit(station._id)}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(station)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(station._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Chargers;
