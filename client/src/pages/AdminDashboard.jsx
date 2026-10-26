import React, { useEffect, useState } from "react";
import {
  Users,
  CalendarCheck,
  IndianRupee,
  LogOut,
  ShieldCheck,
  Package,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState({
    users: [],
    bookings: [],
    totalUsers: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const savedUser = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!token || !savedUser || savedUser.role !== "admin") {
      navigate("/login", { replace: true });
      return;
    }

    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://rentbazar-backend.onrender.com/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load dashboard");
      }

      setDashboard({
        users: data.users || [],
        bookings: data.bookings || [],
        totalUsers: data.totalUsers || 0,
        totalBookings: data.totalBookings || 0,
        totalRevenue: data.totalRevenue || 0,
      });
    } catch (error) {
      console.error("ADMIN DASHBOARD ERROR:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChanged"));

    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600 font-medium">
            Loading Admin Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center">
              <ShieldCheck className="text-green-600" size={25} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                RentBazar Admin
              </h1>

              <p className="text-xs text-gray-500">
                Administration Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={fetchDashboard}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition"
            >
              <RefreshCw size={17} />
              <span className="hidden sm:block">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition"
            >
              <LogOut size={17} />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* ERROR */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-xl">
            <p className="font-semibold">Unable to load dashboard</p>

            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* WELCOME */}

        <div className="mb-8">
          <p className="text-green-600 font-semibold text-sm">
            ADMIN PANEL
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-1">
            Welcome, {savedUser?.name || "Admin"} 👋
          </h2>

          <p className="text-gray-500 mt-2">
            Manage your RentBazar platform from here.
          </p>
        </div>

        {/* STATS */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {/* USERS */}

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Users
                </p>

                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboard.totalUsers}
                </h3>
              </div>

              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          {/* BOOKINGS */}

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Bookings
                </p>

                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboard.totalBookings}
                </h3>
              </div>

              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                <CalendarCheck
                  className="text-green-600"
                  size={28}
                />
              </div>
            </div>
          </div>

          {/* REVENUE */}

          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Revenue
                </p>

                <h3 className="text-3xl font-bold text-gray-900 mt-2">
                  ₹{dashboard.totalRevenue.toLocaleString("en-IN")}
                </h3>
              </div>

              <div className="w-14 h-14 rounded-xl bg-yellow-100 flex items-center justify-center">
                <IndianRupee
                  className="text-yellow-600"
                  size={28}
                />
              </div>
            </div>
          </div>
        </div>

        {/* BOOKINGS */}

        <section className="bg-white rounded-2xl shadow-sm overflow-hidden mb-10">
          <div className="p-6 border-b flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Recent Bookings
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Latest rental bookings
              </p>
            </div>

            <CalendarCheck className="text-green-600" />
          </div>

          {dashboard.bookings.length === 0 ? (
            <div className="py-16 text-center">
              <Package
                size={45}
                className="mx-auto text-gray-300"
              />

              <p className="text-gray-500 mt-3">
                No bookings found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Product
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      User
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Start Date
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      End Date
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Amount
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {dashboard.bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {booking.productImage ? (
                            <img
                              src={booking.productImage}
                              alt={booking.productName}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                              <Package
                                size={20}
                                className="text-gray-400"
                              />
                            </div>
                          )}

                          <div>
                            <p className="font-semibold text-gray-900">
                              {booking.productName}
                            </p>

                            <p className="text-xs text-gray-400">
                              #{booking.bookingId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-800">
                          {booking.user?.name || "User"}
                        </p>

                        <p className="text-xs text-gray-500">
                          {booking.user?.email || ""}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {booking.startDate
                          ? new Date(
                              booking.startDate
                            ).toLocaleDateString("en-IN")
                          : "-"}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {booking.endDate
                          ? new Date(
                              booking.endDate
                            ).toLocaleDateString("en-IN")
                          : "-"}
                      </td>

                      <td className="px-6 py-4 font-semibold text-green-600">
                        ₹{Number(booking.amount || 0).toLocaleString("en-IN")}
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          {booking.status || "Confirmed"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* USERS */}

        <section className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Registered Users
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Users registered on RentBazar
              </p>
            </div>

            <Users className="text-blue-600" />
          </div>

          {dashboard.users.length === 0 ? (
            <div className="py-16 text-center">
              <Users
                size={45}
                className="mx-auto text-gray-300"
              />

              <p className="text-gray-500 mt-3">
                No users found.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Name
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Role
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                      Joined
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {dashboard.users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                            {user.name
                              ? user.name
                                  .charAt(0)
                                  .toUpperCase()
                              : "U"}
                          </div>

                          <span className="font-semibold text-gray-800">
                            {user.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {user.role || "user"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        {user.createdAt
                          ? new Date(
                              user.createdAt
                            ).toLocaleDateString("en-IN")
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;