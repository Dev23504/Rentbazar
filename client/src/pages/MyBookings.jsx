import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/bookings/my-bookings",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("MY BOOKINGS RESPONSE:", data);

      if (!response.ok) {
        setError(data.message || "Failed to load bookings.");
        return;
      }

      setBookings(Array.isArray(data.bookings) ? data.bookings : []);
    } catch (error) {
      console.error("GET BOOKINGS ERROR:", error);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto"></div>

          <h2 className="text-xl font-semibold mt-4">
            Loading bookings...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              My Bookings
            </h1>

            <p className="text-gray-500 mt-1">
              {bookings.length} booking
              {bookings.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <button
            onClick={getBookings}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-semibold transition"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-6">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-xl font-semibold mb-3">
              No Bookings Yet
            </h2>

            <p className="text-gray-500 mb-6">
              You haven't booked anything yet.
            </p>

            <Link
              to="/rentals"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
            >
              Browse Rentals
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                {booking.productImage ? (
                  <img
                    src={booking.productImage}
                    alt={booking.productName}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}

                <div className="p-5">
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <h2 className="text-xl font-bold text-gray-900">
                      {booking.productName}
                    </h2>

                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                      {booking.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-gray-600">
                    <p>
                      <span className="font-semibold text-gray-800">
                        Start:
                      </span>{" "}
                      {formatDate(booking.startDate)}
                    </p>

                    <p>
                      <span className="font-semibold text-gray-800">
                        End:
                      </span>{" "}
                      {formatDate(booking.endDate)}
                    </p>

                    <p>
                      <span className="font-semibold text-gray-800">
                        Amount:
                      </span>{" "}
                      ₹{booking.amount}
                    </p>

                    <p>
                      <span className="font-semibold text-gray-800">
                        Payment:
                      </span>{" "}
                      <span className="text-green-600 font-semibold">
                        {booking.paymentStatus}
                      </span>
                    </p>
                  </div>

                  <div className="border-t mt-5 pt-4">
                    <p className="text-xs text-gray-400">
                      Booking created
                    </p>

                    <p className="text-sm text-gray-600">
                      {formatDateTime(booking.createdAt)}
                    </p>
                  </div>

                  {booking.bookingId && (
                    <p className="text-xs text-gray-400 mt-3 break-all">
                      Booking ID: {booking.bookingId}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;