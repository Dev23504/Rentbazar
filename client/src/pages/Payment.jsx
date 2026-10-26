import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [rentalData, setRentalData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem("rentalData");

      if (savedData) {
        const data = JSON.parse(savedData);

        if (data?.product?.owner) {
          data.product.owner = {
            name: data.product.owner.name || "N/A",
            phone: data.product.owner.phone || "N/A",
            email: data.product.owner.email || "N/A",
          };
        } else {
          data.product.owner = {
            name: "N/A",
            phone: "N/A",
            email: "N/A",
          };
        }

        setRentalData(data);
      }
    } catch (error) {
      console.error("Rental data error:", error);
    }
  }, []);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!rentalData) {
      alert("Rental information not found");
      return;
    }

    if (
      !rentalData.product ||
      !rentalData.customer ||
      !rentalData.total
    ) {
      alert("Invalid rental information");
      return;
    }

    if (
      !rentalData.customer.startDate ||
      !rentalData.customer.endDate
    ) {
      alert("Rental dates are missing. Please fill the rental form again.");
      navigate(`/rental/${id}`);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login before making payment");
      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const razorpayLoaded = await loadRazorpay();

      if (!razorpayLoaded) {
        alert("Razorpay failed to load");
        setLoading(false);
        return;
      }

      const keyResponse = await fetch(
        "https://rentbazar-backend.onrender.com/api/payment/key"
      );

      const keyData = await keyResponse.json();

      if (!keyResponse.ok || !keyData.success || !keyData.key) {
        alert("Razorpay Key ID not available from server");
        setLoading(false);
        return;
      }

      const orderResponse = await fetch(
        "https://rentbazar-backend.onrender.com/api/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: rentalData.total,
          }),
        }
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        alert(
          orderData.message || "Unable to create Razorpay order"
        );
        setLoading(false);
        return;
      }

      const options = {
        key: keyData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "RentBazar",
        description: `Rental for ${rentalData.product.title}`,
        order_id: orderData.order.id,

        prefill: {
          name: rentalData.customer.name || "",
          email: rentalData.customer.email || "",
          contact: rentalData.customer.phone || "",
        },

        theme: {
          color: "#16a34a",
        },

        handler: async function (paymentResponse) {
          try {
            const bookingId =
              "RB" + Date.now().toString().slice(-8);

            const owner = rentalData.product.owner || {
              name: "N/A",
              phone: "N/A",
              email: "N/A",
            };

            const finalData = {
              ...rentalData,

              product: {
                ...rentalData.product,

                owner: {
                  name: owner.name || "N/A",
                  phone: owner.phone || "N/A",
                  email: owner.email || "N/A",
                },
              },

              paymentMethod: "Razorpay",

              paymentId:
                paymentResponse.razorpay_payment_id,

              orderId:
                paymentResponse.razorpay_order_id,

              signature:
                paymentResponse.razorpay_signature,

              bookingId,

              bookingDate: new Date().toISOString(),

              status: "Confirmed",
            };

            const bookingResponse = await fetch(
              "https://rentbazar-backend.onrender.com/api/bookings",
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify({
                  product:
                    rentalData.product.id ||
                    rentalData.product._id ||
                    id,

                  productName:
                    rentalData.product.title,

                  productImage:
                    rentalData.product.image || "",

                  startDate:
                    rentalData.customer.startDate,

                  endDate:
                    rentalData.customer.endDate,

                  amount:
                    rentalData.total,

                  paymentId:
                    paymentResponse.razorpay_payment_id,

                  orderId:
                    paymentResponse.razorpay_order_id,

                  bookingId,
                }),
              }
            );

            const bookingData =
              await bookingResponse.json();

            if (
              !bookingResponse.ok ||
              !bookingData.success
            ) {
              localStorage.setItem(
                "rentalData",
                JSON.stringify(finalData)
              );

              setRentalData(finalData);
              setLoading(false);

              alert(
                bookingData.message ||
                  "Payment successful but booking save failed."
              );

              navigate(`/bill/${id}`);
              return;
            }

            const completeData = {
              ...finalData,

              mongoBookingId:
                bookingData.booking?._id || "",
            };

            localStorage.setItem(
              "rentalData",
              JSON.stringify(completeData)
            );

            setRentalData(completeData);
            setLoading(false);

            alert("Payment successful! Booking confirmed.");

            navigate(`/bill/${id}`);
          } catch (error) {
            console.error("Booking Save Error:", error);

            const bookingId =
              "RB" + Date.now().toString().slice(-8);

            const owner =
              rentalData.product.owner || {
                name: "N/A",
                phone: "N/A",
                email: "N/A",
              };

            const finalData = {
              ...rentalData,

              product: {
                ...rentalData.product,

                owner: {
                  name: owner.name || "N/A",
                  phone: owner.phone || "N/A",
                  email: owner.email || "N/A",
                },
              },

              paymentMethod: "Razorpay",

              paymentId:
                paymentResponse.razorpay_payment_id,

              orderId:
                paymentResponse.razorpay_order_id,

              signature:
                paymentResponse.razorpay_signature,

              bookingId,

              bookingDate: new Date().toISOString(),

              status: "Confirmed",
            };

            localStorage.setItem(
              "rentalData",
              JSON.stringify(finalData)
            );

            setRentalData(finalData);
            setLoading(false);

            alert(
              "Payment successful. Booking server error occurred."
            );

            navigate(`/bill/${id}`);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (paymentResponse) {
          console.error(
            "Payment failed:",
            paymentResponse.error
          );

          alert(
            paymentResponse.error?.description ||
              "Payment failed. Please try again."
          );

          setLoading(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);

      alert(
        "Something went wrong while processing payment."
      );

      setLoading(false);
    }
  };

  if (!rentalData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-bold">
            Rental Information Not Found
          </h2>

          <p className="text-gray-500 mt-3">
            Please start the rental process again.
          </p>

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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Secure Payment
            </h1>

            <p className="text-gray-500 mt-2">
              Pay securely using Razorpay
            </p>

            <div className="mt-8 border border-green-200 bg-green-50 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold">
                  ₹
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    Razorpay
                  </h3>

                  <p className="text-gray-600 text-sm">
                    UPI, Cards, Net Banking & Wallets
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 rounded-xl p-5">
              <p className="text-sm text-gray-500">
                Amount to Pay
              </p>

              <h2 className="text-4xl font-bold text-green-600 mt-1">
                ₹{rentalData.total}
              </h2>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-7 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-bold text-lg transition"
            >
              {loading
                ? "Processing..."
                : `Pay ₹${rentalData.total}`}
            </button>

            <p className="text-center text-gray-400 text-sm mt-4">
              Your payment is processed securely by Razorpay
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
            <h2 className="text-2xl font-bold">
              Rental Summary
            </h2>

            <div className="flex gap-4 mt-6">
              <img
                src={rentalData.product.image}
                alt={rentalData.product.title}
                className="w-28 h-24 object-cover rounded-xl"
              />

              <div>
                <h3 className="font-bold">
                  {rentalData.product.title}
                </h3>

                <p className="text-gray-500 mt-1">
                  {rentalData.product.category}
                </p>

                <p className="text-gray-500">
                  {rentalData.days} day(s)
                </p>
              </div>
            </div>

            <div className="border-t mt-6 pt-5 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Rental Price
                </span>

                <span>
                  ₹{rentalData.product.price} ×{" "}
                  {rentalData.days}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">
                  Security Deposit
                </span>

                <span>
                  ₹{rentalData.securityDeposit}
                </span>
              </div>

              <div className="border-t pt-4 flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-green-600">
                  ₹{rentalData.total}
                </span>
              </div>
            </div>

            <div className="border-t mt-6 pt-6">
              <h3 className="text-xl font-bold mb-4">
                Owner Details
              </h3>

              <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Name
                  </span>

                  <span className="font-semibold text-right">
                    {rentalData.product.owner?.name || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Mobile
                  </span>

                  <span className="font-semibold text-right">
                    {rentalData.product.owner?.phone || "N/A"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Email
                  </span>

                  <span className="font-semibold text-right break-all">
                    {rentalData.product.owner?.email || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t mt-6 pt-6">
              <h3 className="text-xl font-bold mb-4">
                Customer Details
              </h3>

              <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Name
                  </span>

                  <span className="font-semibold text-right">
                    {rentalData.customer.name}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Mobile
                  </span>

                  <span className="font-semibold text-right">
                    {rentalData.customer.phone}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Email
                  </span>

                  <span className="font-semibold text-right break-all">
                    {rentalData.customer.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t mt-6 pt-6">
              <h3 className="text-xl font-bold mb-4">
                Rental Dates
              </h3>

              <div className="bg-gray-50 rounded-xl p-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Start Date
                  </span>

                  <span className="font-semibold">
                    {rentalData.customer.startDate}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    End Date
                  </span>

                  <span className="font-semibold">
                    {rentalData.customer.endDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;