
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import products from "../data/product";

const RentalForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const userProducts = JSON.parse(
    localStorage.getItem("userProducts") || "[]"
  );

  const allProducts = [...products, ...userProducts];

  const product = allProducts.find(
    (item) => String(item.id) === String(id)
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!product) {
      alert("Product not found");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.address.trim() ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert("Please fill all details");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10 digit mobile number");
      return;
    }

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (end < start) {
      alert("End date cannot be before start date");
      return;
    }

    const days =
      Math.ceil(
        (end.getTime() - start.getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;

    const subtotal = Number(product.price) * days;
    const securityDeposit = 500;
    const total = subtotal + securityDeposit;

    const rentalData = {
      product: {
        id: product.id,
        title: product.title,
        category: product.category,
        location: product.location,
        image: product.image,
        price: Number(product.price),
        rating: product.rating || 5,
        owner: {
          name: product.owner?.name || "N/A",
          phone: product.owner?.phone || "N/A",
          email: product.owner?.email || "N/A",
        },
      },
      customer: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate,
      },
      days,
      subtotal,
      securityDeposit,
      total,
      paymentMethod: "",
      paymentId: "",
      orderId: "",
      signature: "",
      bookingId: "",
      bookingDate: "",
      status: "Pending",
    };

    localStorage.setItem(
      "rentalData",
      JSON.stringify(rentalData)
    );

    navigate(`/payment/${product.id}`);
  };

  const today = new Date()
    .toISOString()
    .split("T")[0];

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-700">
            Product Not Found
          </h2>

          <button
            onClick={() => navigate("/rentals")}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Back to Rentals
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="bg-green-600 text-white p-8">
            <h1 className="text-3xl font-bold">
              Rent {product.title}
            </h1>

            <p className="mt-2 text-green-100">
              Enter your details and rental dates
            </p>
          </div>

          <div className="p-8">

            <div className="flex gap-5 mb-8 pb-6 border-b">

              <img
                src={product.image}
                alt={product.title}
                className="w-32 h-28 object-cover rounded-xl"
              />

              <div>
                <h2 className="text-2xl font-bold">
                  {product.title}
                </h2>

                <p className="text-gray-500 mt-1">
                  {product.category}
                </p>

                <p className="text-gray-500 mt-1">
                  📍 {product.location}
                </p>

                <p className="text-green-600 font-bold text-xl mt-2">
                  ₹{product.price}
                  <span className="text-sm text-gray-500">
                    {" "}/ day
                  </span>
                </p>

                <p className="text-gray-500 mt-1">
                  Owner: {product.owner?.name || "N/A"}
                </p>
              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div>

                <h2 className="text-xl font-bold mb-4">
                  Personal Details
                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                  <div>
                    <label className="font-semibold">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold">
                      Mobile Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter 10 digit mobile number"
                      maxLength="10"
                      className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                </div>

                <div className="mt-5">

                  <label className="font-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />

                </div>

                <div className="mt-5">

                  <label className="font-semibold">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    rows="4"
                    className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                  />

                </div>

              </div>

              <div className="border-t pt-6">

                <h2 className="text-xl font-bold mb-4">
                  Rental Dates
                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                  <div>

                    <label className="font-semibold">
                      Start Date
                    </label>

                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      min={today}
                      onChange={handleChange}
                      className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />

                  </div>

                  <div>

                    <label className="font-semibold">
                      End Date
                    </label>

                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      min={formData.startDate || today}
                      onChange={handleChange}
                      className="w-full mt-2 border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                    />

                  </div>

                </div>

              </div>

              <div className="border-t pt-6">

                <div className="bg-gray-50 rounded-xl p-5 space-y-3">

                  <div className="flex justify-between">
                    <span>Daily Rental Price</span>

                    <span className="font-semibold">
                      ₹{product.price}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Security Deposit</span>

                    <span className="font-semibold">
                      ₹500
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 pt-2">
                    Final rental amount will be calculated
                    according to the selected dates.
                  </p>

                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition"
                >
                  Continue to Payment →
                </button>

              </div>

            </form>

          </div>

        </div>
      </div>
    </div>
  );
};

export default RentalForm;
