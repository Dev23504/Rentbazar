import React from "react";
import { Download, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Bill = () => {
  const navigate = useNavigate();

  const rentalData = JSON.parse(
    localStorage.getItem("rentalData") || "null"
  );

  if (!rentalData || !rentalData.product || !rentalData.customer) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-800">
            No Booking Found
          </h2>

          <p className="text-gray-500 mt-3">
            Please start your rental booking again.
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

  const { product, customer } = rentalData;

  const owner =
    product.owner ||
    rentalData.owner || {
      name: product.ownerName || "N/A",
      phone: product.ownerPhone || "N/A",
      email: product.ownerEmail || "N/A",
    };

  const price = Number(product.price || 0);
  const days = Number(rentalData.days || 0);

  const rentalCharges = Number(
    rentalData.subtotal || price * days
  );

  const securityDeposit = Number(
    rentalData.securityDeposit || 0
  );

  const total = Number(
    rentalData.total || rentalCharges + securityDeposit
  );

  const bookingId =
    rentalData.bookingId ||
    "RB" + Date.now().toString().slice(-8);

  const paymentId = rentalData.paymentId || "N/A";
  const orderId = rentalData.orderId || "N/A";

  const bookingDate = rentalData.bookingDate
    ? new Date(rentalData.bookingDate).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )
    : new Date().toLocaleDateString("en-IN");

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style>{`
        /* =========================
           PRINT SETTINGS
        ========================== */

        @media print {

          @page {
            size: A4 portrait;
            margin: 6mm;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          html,
          body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            background: white !important;
          }

          body {
            overflow: hidden !important;
          }

          /* Navbar, buttons, confirmation bar etc. */
          nav,
          header,
          footer,
          .navbar,
          .no-print {
            display: none !important;
          }

          .invoice-page {
            min-height: 0 !important;
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
          }

          .invoice-container {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          .invoice {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            border: 1px solid #d1d5db !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }

          .invoice-content {
            padding: 16px !important;
          }

          /* Header */
          .invoice-header {
            padding-bottom: 10px !important;
          }

          .invoice-title {
            font-size: 25px !important;
          }

          .invoice-subtitle {
            font-size: 9px !important;
          }

          .invoice-heading {
            font-size: 22px !important;
          }

          /* Owner / Customer */
          .details-section {
            padding: 10px 0 !important;
            gap: 20px !important;
          }

          .details-heading {
            font-size: 8px !important;
            margin-bottom: 5px !important;
          }

          .details-text {
            font-size: 9px !important;
            margin-top: 2px !important;
          }

          /* Rental dates */
          .rental-info {
            padding: 8px !important;
            margin-bottom: 10px !important;
          }

          .rental-label {
            font-size: 8px !important;
          }

          .rental-value {
            font-size: 9px !important;
            margin-top: 2px !important;
          }

          /* Table */
          .invoice-table {
            margin-top: 5px !important;
          }

          .table-header {
            padding: 7px !important;
            font-size: 8px !important;
          }

          .table-row {
            padding: 8px !important;
          }

          .product-image {
            width: 45px !important;
            height: 45px !important;
          }

          .product-title {
            font-size: 10px !important;
          }

          .product-info {
            font-size: 8px !important;
            margin-top: 1px !important;
          }

          .table-text {
            font-size: 9px !important;
          }

          .security-row {
            padding: 7px !important;
            font-size: 9px !important;
          }

          /* Total */
          .total-section {
            margin-top: 10px !important;
          }

          .total-box {
            width: 260px !important;
          }

          .total-line {
            padding: 3px 0 !important;
            font-size: 9px !important;
          }

          .total-paid {
            padding-top: 7px !important;
          }

          .total-text {
            font-size: 15px !important;
          }

          .total-amount {
            font-size: 18px !important;
          }

          /* Payment / Item */
          .bottom-section {
            margin-top: 12px !important;
            padding-top: 10px !important;
            gap: 25px !important;
          }

          .bottom-heading {
            font-size: 8px !important;
            margin-bottom: 5px !important;
          }

          .bottom-text {
            font-size: 8px !important;
          }

          .bottom-row {
            margin-bottom: 2px !important;
          }

          /* Thank you */
          .thank-you {
            margin-top: 10px !important;
            padding: 7px !important;
          }

          .thank-title {
            font-size: 9px !important;
          }

          .thank-text {
            font-size: 7px !important;
            margin-top: 1px !important;
          }

          .computer-text {
            margin-top: 8px !important;
            font-size: 7px !important;
          }
        }
      `}</style>

      <div className="invoice-page min-h-screen bg-gray-100 py-10 px-4">
        <div className="invoice-container max-w-4xl mx-auto">

          {/* Confirmation - Screen Only */}
          <div className="no-print bg-white rounded-xl shadow-sm p-6 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle
                  size={24}
                  className="text-green-600"
                />
              </div>

              <div>
                <h2 className="font-bold text-gray-800">
                  Rental Confirmed
                </h2>

                <p className="text-sm text-gray-500">
                  Your payment and booking have been confirmed.
                </p>
              </div>
            </div>

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
              PAID
            </span>
          </div>

          {/* Invoice */}
          <div className="invoice bg-white shadow-xl border border-gray-200">

            <div className="invoice-content p-8">

              {/* HEADER */}
              <div className="invoice-header flex justify-between items-start pb-7 border-b-2 border-gray-800">

                <div>
                  <h1 className="invoice-title text-4xl font-black tracking-tight text-green-600">
                    RentBazar
                  </h1>

                  <p className="invoice-subtitle text-gray-500 text-sm mt-1">
                    Peer-to-Peer Rental Marketplace
                  </p>

                  <p className="invoice-subtitle text-gray-500 text-sm mt-3">
                    Rental Invoice
                  </p>
                </div>

                <div className="text-right">

                  <h2 className="invoice-heading text-3xl font-bold text-gray-800">
                    INVOICE
                  </h2>

                  <div className="mt-3 text-sm">

                    <p className="text-gray-500">
                      Booking No.
                    </p>

                    <p className="font-bold text-gray-800">
                      {bookingId}
                    </p>

                    <p className="text-gray-500 mt-2">
                      Invoice Date
                    </p>

                    <p className="font-semibold text-gray-800">
                      {bookingDate}
                    </p>

                  </div>
                </div>

              </div>

              {/* OWNER + CUSTOMER (OWNER DETAILS FIRST) */}
              <div className="details-section grid md:grid-cols-2 gap-8 py-7">

                {/* 1. OWNER DETAILS FIRST */}
                <div>

                  <h3 className="details-heading text-xs uppercase tracking-widest font-bold text-gray-500 mb-3">
                    Owner Details
                  </h3>

                  <div className="border-l-4 border-green-500 pl-4">

                    <p className="details-text text-lg font-bold text-gray-800">
                      {owner.name || "N/A"}
                    </p>

                    <p className="details-text text-sm text-gray-600 mt-2">
                      {owner.phone || "N/A"}
                    </p>

                    <p className="details-text text-sm text-gray-600 break-all">
                      {owner.email || "N/A"}
                    </p>

                  </div>
                </div>

                {/* 2. CUSTOMER DETAILS SECOND */}
                <div>

                  <h3 className="details-heading text-xs uppercase tracking-widest font-bold text-gray-500 mb-3">
                    Bill To (Customer)
                  </h3>

                  <div className="border-l-4 border-green-500 pl-4">

                    <p className="details-text text-lg font-bold text-gray-800">
                      {customer.name || "N/A"}
                    </p>

                    <p className="details-text text-sm text-gray-600 mt-2">
                      {customer.phone || "N/A"}
                    </p>

                    <p className="details-text text-sm text-gray-600 break-all">
                      {customer.email || "N/A"}
                    </p>

                    <p className="details-text text-sm text-gray-600 mt-1">
                      {customer.address || "N/A"}
                    </p>

                  </div>
                </div>

              </div>

              {/* RENTAL INFO */}
              <div className="rental-info grid md:grid-cols-3 gap-4 bg-gray-50 border border-gray-200 p-5 mb-7">

                <div>
                  <p className="rental-label text-xs uppercase font-bold text-gray-500">
                    Rental Start
                  </p>

                  <p className="rental-value font-semibold text-gray-800 mt-1">
                    {customer.startDate || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="rental-label text-xs uppercase font-bold text-gray-500">
                    Rental End
                  </p>

                  <p className="rental-value font-semibold text-gray-800 mt-1">
                    {customer.endDate || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="rental-label text-xs uppercase font-bold text-gray-500">
                    Duration
                  </p>

                  <p className="rental-value font-semibold text-gray-800 mt-1">
                    {days} Day(s)
                  </p>
                </div>

              </div>

              {/* TABLE */}
              <div className="invoice-table border border-gray-300">

                <div className="table-header grid grid-cols-12 bg-gray-800 text-white text-xs uppercase font-bold py-4 px-4">

                  <div className="col-span-6">
                    Description
                  </div>

                  <div className="col-span-2 text-center">
                    Rate
                  </div>

                  <div className="col-span-2 text-center">
                    Days
                  </div>

                  <div className="col-span-2 text-right">
                    Amount
                  </div>

                </div>

                <div className="table-row grid grid-cols-12 items-center py-5 px-4 border-b border-gray-200">

                  <div className="col-span-6 flex gap-4 items-center">

                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-image w-16 h-16 object-cover rounded-lg border"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <div>

                      <p className="product-title font-bold text-gray-800">
                        {product.title}
                      </p>

                      <p className="product-info text-xs text-gray-500 mt-1">
                        {product.category}
                      </p>

                      <p className="product-info text-xs text-gray-500 mt-1">
                        {product.location}
                      </p>

                    </div>
                  </div>

                  <div className="table-text col-span-2 text-center text-gray-700">
                    ₹{price}
                  </div>

                  <div className="table-text col-span-2 text-center text-gray-700">
                    {days}
                  </div>

                  <div className="table-text col-span-2 text-right font-semibold text-gray-800">
                    ₹{rentalCharges}
                  </div>

                </div>

                <div className="security-row grid grid-cols-12 py-4 px-4 border-b border-gray-200">

                  <div className="col-span-8"></div>

                  <div className="col-span-2 text-right text-sm text-gray-600">
                    Security Deposit
                  </div>

                  <div className="col-span-2 text-right font-semibold">
                    ₹{securityDeposit}
                  </div>

                </div>

              </div>

              {/* TOTAL */}
              <div className="total-section flex justify-end mt-6">

                <div className="total-box w-full md:w-80">

                  <div className="total-line flex justify-between py-2 text-sm">

                    <span className="text-gray-500">
                      Rental Charges
                    </span>

                    <span>
                      ₹{rentalCharges}
                    </span>

                  </div>

                  <div className="total-line flex justify-between py-2 text-sm">

                    <span className="text-gray-500">
                      Security Deposit
                    </span>

                    <span>
                      ₹{securityDeposit}
                    </span>

                  </div>

                  <div className="total-paid border-t-2 border-gray-800 mt-2 pt-4 flex justify-between items-center">

                    <span className="total-text text-lg font-bold">
                      Total Paid
                    </span>

                    <span className="total-amount text-2xl font-black text-green-600">
                      ₹{total}
                    </span>

                  </div>

                </div>

              </div>

              {/* PAYMENT + ITEM */}
              <div className="bottom-section grid md:grid-cols-2 gap-8 mt-8 pt-7 border-t border-gray-200">

                {/* PAYMENT */}
                <div>

                  <h3 className="bottom-heading text-xs uppercase tracking-widest font-bold text-gray-500 mb-3">
                    Payment Information
                  </h3>

                  <div className="space-y-2 text-sm">

                    <div className="bottom-row flex justify-between gap-4">

                      <span className="bottom-text text-gray-500">
                        Method
                      </span>

                      <span className="bottom-text font-semibold">
                        {rentalData.paymentMethod || "Razorpay"}
                      </span>

                    </div>

                    <div className="bottom-row flex justify-between gap-4">

                      <span className="bottom-text text-gray-500">
                        Payment ID
                      </span>

                      <span className="bottom-text font-mono text-xs break-all text-right">
                        {paymentId}
                      </span>

                    </div>

                    <div className="bottom-row flex justify-between gap-4">

                      <span className="bottom-text text-gray-500">
                        Order ID
                      </span>

                      <span className="bottom-text font-mono text-xs break-all text-right">
                        {orderId}
                      </span>

                    </div>

                  </div>
                </div>

                {/* RENTAL ITEM */}
                <div>

                  <h3 className="bottom-heading text-xs uppercase tracking-widest font-bold text-gray-500 mb-3">
                    Rental Item
                  </h3>

                  <div className="space-y-2 text-sm">

                    <div className="bottom-row flex justify-between">

                      <span className="bottom-text text-gray-500">
                        Category
                      </span>

                      <span className="bottom-text font-semibold">
                        {product.category}
                      </span>

                    </div>

                    <div className="bottom-row flex justify-between">

                      <span className="bottom-text text-gray-500">
                        Location
                      </span>

                      <span className="bottom-text font-semibold">
                        {product.location}
                      </span>

                    </div>

                    <div className="bottom-row flex justify-between">

                      <span className="bottom-text text-gray-500">
                        Status
                      </span>

                      <span className="bottom-text font-bold text-green-600">
                        {rentalData.status || "Confirmed"}
                      </span>

                    </div>

                  </div>
                </div>

              </div>

              {/* THANK YOU */}
              <div className="thank-you mt-8 bg-green-50 border border-green-200 p-4 text-center">

                <p className="thank-title text-sm font-semibold text-green-800">
                  Thank you for choosing RentBazar
                </p>

                <p className="thank-text text-xs text-green-700 mt-1">
                  Please keep this invoice for your rental records.
                </p>

              </div>

              <div className="computer-text mt-8 text-center text-xs text-gray-400">
                This is a computer-generated invoice and does not require a signature.
              </div>

              {/* BUTTONS - SCREEN ONLY */}
              <div className="no-print flex gap-4 mt-8">

                <button
                  onClick={handlePrint}
                  className="flex-1 border border-gray-300 hover:border-green-600 hover:text-green-600 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download / Print
                </button>

                <button
                  onClick={() => navigate("/rentals")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <ArrowLeft size={18} />
                  Continue Renting
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bill;