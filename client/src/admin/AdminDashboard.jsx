
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  CalendarCheck,
  ShieldCheck,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`${API}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Unable to load dashboard");
        return data;
      })
      .then((data) => setStats(data.stats))
      .catch((err) => setError(err.message));
  }, []);

  const cards = [
    { label: "Total Users", key: "users", icon: Users },
    { label: "Total Bookings", key: "bookings", icon: CalendarCheck },
    { label: "Pending KYC", key: "pendingKYC", icon: Clock },
    { label: "Verified KYC", key: "verifiedKYC", icon: CheckCircle },
    { label: "Rejected KYC", key: "rejectedKYC", icon: XCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            RentBazar Administration
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-slate-500">
            Manage users, bookings and identity verification.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl bg-red-50 p-4 text-red-700">
            {error}. Check your admin login and API server.
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ label, key, icon: Icon }) => (
            <div
              key={key}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-slate-500">{label}</p>
                <Icon className="h-6 w-6 text-indigo-600" />
              </div>
              <p className="mt-4 text-3xl font-bold text-slate-900">
                {stats ? stats[key] ?? 0 : "—"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            { to: "/admin/kyc", label: "Review KYC", icon: ShieldCheck },
            { to: "/admin/users", label: "Manage Users", icon: Users },
            { to: "/admin/bookings", label: "Manage Bookings", icon: CalendarCheck },
          ].map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-indigo-400 hover:shadow-md"
            >
              <span className="flex items-center gap-3 font-semibold text-slate-800">
                <Icon className="h-5 w-5 text-indigo-600" />
                {label}
              </span>
              <ArrowRight className="h-5 w-5 text-slate-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
