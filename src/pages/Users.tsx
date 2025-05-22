import { useEffect, useState } from "react";
import { getUsers, deleteUser, updateUser } from "../api/admin";

type User = {
  _id: string;
  email: string;
  fullName?: string;
  role: "user" | "admin";
  createdAt: string;
  lastLogin?: string;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this user?");
    if (!confirm) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  const startEdit = (user: User) => {
    setEditingId(user._id);
    setEditForm({ fullName: user.fullName, role: user.role });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async (id: string) => {
    try {
      const updated = await updateUser(id, editForm);
      setUsers(users.map((u) => (u._id === id ? updated.data : u)));
      cancelEdit();
    } catch (err) {
      alert("Failed to update user.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const getStatus = (lastLogin?: string) => {
    if (!lastLogin) return "Inactive";
    const last = new Date(lastLogin);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 30 ? "Active" : "Inactive";
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border border-gray-300 bg-white shadow-md rounded text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border-b w-[20%]">Email</th>
                <th className="px-4 py-2 border-b w-[15%]">Full Name</th>
                <th className="px-4 py-2 border-b w-[10%]">Role</th>
                <th className="px-4 py-2 border-b w-[15%]">Created At</th>
                <th className="px-4 py-2 border-b w-[20%]">Last Login</th>
                <th className="px-4 py-2 border-b w-[10%]">Status</th>
                <th className="px-4 py-2 border-b w-[20%] text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-4 py-2 border-b">{user.email}</td>
                    <td className="px-4 py-2 border-b">
                      {editingId === user._id ? (
                        <input
                          type="text"
                          name="fullName"
                          value={editForm.fullName || ""}
                          onChange={handleChange}
                          className="border px-2 py-1 w-full"
                        />
                      ) : (
                        user.fullName || <span className="italic text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">
                      {editingId === user._id ? (
                        <select
                          name="role"
                          value={editForm.role || "user"}
                          onChange={handleChange}
                          className="border px-2 py-1"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <span className="capitalize">{user.role}</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border-b">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleDateString()
                        : <span className="italic text-gray-400">Never</span>}
                    </td>
                    <td className="px-4 py-2 border-b">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          getStatus(user.lastLogin) === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {getStatus(user.lastLogin)}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b text-center space-x-2">
                      {editingId === user._id ? (
                        <>
                          <button
                            onClick={() => saveEdit(user._id)}
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
                            onClick={() => startEdit(user)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
