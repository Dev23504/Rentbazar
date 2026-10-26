
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, RefreshCw, Trash2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  async function loadBookings() {
    try {
      const response = await fetch(`${API}/api/admin/bookings`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Unable to load bookings");

      setBookings(data.bookings || []);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function deleteBooking(id) {
    if (!window.confirm("Delete this booking?")) return;

    try {
      const response = await fetch(`${API}/api/admin/bookings/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Delete failed");

      setBookings((old) => old.filter((booking) => booking._id !== id));
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
          <h1 className="text-3xl font-bold text-slate-900">Bookings</h1>
          <button onClick={loadBookings} className="rounded-xl border bg-white p-3">
            <RefreshCw size={18} />
          </button>
        </div>

        {error && <p className="mt-4 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}

        <div className="mt-6 overflow-x-auto rounded-2xl border bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="p-4">Booking ID</th>
                <th className="p-4">Product</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-t">
                  <td className="p-4">{booking._id}</td>
                  <td className="p-4">{booking.productName || booking.productId || "—"}</td>
                  <td className="p-4">₹{booking.amount ?? booking.totalAmount ?? "—"}</td>
                  <td className="p-4">{booking.status || "—"}</td>
                  <td className="p-4">
                    <button
                      onClick={() => deleteBooking(booking._id)}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 font-medium text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={15} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    No bookings found.
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
