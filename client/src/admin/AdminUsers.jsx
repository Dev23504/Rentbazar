
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Trash2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  async function loadUsers() {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to load users");

      setUsers(data.users || []);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function deleteUser(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`${API}/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Delete failed");

      setUsers((old) => old.filter((user) => user._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <Link to="/admin" className="mb-6 inline-flex items-center gap-2 text-slate-600">
          <ArrowLeft size={18} /> Dashboard
        </Link>

        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-slate-900">Users</h1>
          <button onClick={loadUsers} className="rounded-xl border bg-white p-3">
            <RefreshCw size={18} />
          </button>
        </div>

        {error && <p className="mt-4 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}

        <div className="mt-6 overflow-x-auto rounded-2xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-4 font-medium">{user.name || "—"}</td>
                  <td className="p-4">{user.email || "—"}</td>
                  <td className="p-4">{user.role || "user"}</td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 font-medium text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
