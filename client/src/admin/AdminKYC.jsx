
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  RefreshCw,
  ShieldCheck,
  CheckCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "https://rentbazar-backend.onrender.com";

export default function AdminKYC() {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState("");
  const [reasons, setReasons] = useState({});

  const token = localStorage.getItem("token");

  const loadRequests = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${API}/api/admin/kyc?status=${status}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load KYC requests");
      }

      setRequests(data.requests || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [status, token]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  async function reviewKYC(id, decision) {
    const rejectionReason = (reasons[id] || "").trim();

    if (
      decision === "rejected" &&
      !rejectionReason
    ) {
      setError("Rejection reason is required.");
      return;
    }

    const confirmed = window.confirm(
      decision === "verified"
        ? "Verify this KYC request?"
        : "Reject this KYC request?"
    );

    if (!confirmed) return;

    setProcessing(id);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API}/api/admin/kyc/${id}/review`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: decision,
            rejectionReason,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to review KYC");
      }

      setMessage(data.message || "KYC review completed.");
      await loadRequests();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing("");
    }
  }

  const documentLinks = [
    ["Driving License", "drivingLicenseUrl"],
    ["Address Proof", "addressProofUrl"],
    ["Selfie", "selfieUrl"],
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to="/admin"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </Link>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-slate-900">
                KYC Verification
              </h1>
            </div>
            <p className="mt-2 text-slate-500">
              Review identity documents before verifying users.
            </p>
          </div>

          <button
            onClick={loadRequests}
            className="inline-flex items-center gap-2 rounded-xl border bg-white px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
          >
            <RefreshCw size={17} /> Refresh
          </button>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {["pending", "verified", "rejected"].map((item) => (
            <button
              key={item}
              onClick={() => setStatus(item)}
              className={`rounded-xl px-5 py-3 text-sm font-semibold capitalize ${
                status === item
                  ? "bg-indigo-600 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-700">
            {message}
          </div>
        )}

        {loading ? (
          <div className="py-16 text-center text-slate-500">
            Loading KYC requests...
          </div>
        ) : requests.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <ShieldCheck className="mx-auto h-12 w-12 text-slate-300" />
            <h2 className="mt-4 text-xl font-semibold text-slate-800">
              No {status} KYC requests
            </h2>
            <p className="mt-2 text-slate-500">
              Requests will appear here when available.
            </p>
          </div>
        ) : (
          <div className="mt-7 grid gap-6 lg:grid-cols-2">
            {requests.map((item) => (
              <article
                key={item._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 p-5">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {item.name}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.email}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {item.phone}
                    </p>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">
                    {item.status}
                  </span>
                </div>

                <div className="space-y-2 p-5 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-800">
                      Address:
                    </span>{" "}
                    {item.address}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      Product ID:
                    </span>{" "}
                    {item.productId}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">
                      Submitted:
                    </span>{" "}
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "—"}
                  </p>
                </div>

                <div className="grid gap-3 px-5 pb-5 sm:grid-cols-3">
                  {documentLinks.map(([label, key]) => (
                    <a
                      key={key}
                      href={`${API}/api/admin/kyc/${item._id}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 text-sm font-medium text-indigo-600 hover:bg-indigo-50"
                      title={`Open KYC details to access ${label}`}
                    >
                      {label}
                      <ExternalLink size={15} />
                    </a>
                  ))}
                </div>

                {item.status === "pending" && (
                  <div className="border-t border-slate-100 bg-slate-50 p-5">
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Rejection reason (required to reject)
                    </label>
                    <textarea
                      value={reasons[item._id] || ""}
                      onChange={(event) =>
                        setReasons((old) => ({
                          ...old,
                          [item._id]: event.target.value,
                        }))
                      }
                      rows={2}
                      placeholder="Explain what needs to be corrected..."
                      className="w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        disabled={processing === item._id}
                        onClick={() => reviewKYC(item._id, "verified")}
                        className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-50"
                      >
                        <CheckCircle size={17} />
                        Verify KYC
                      </button>

                      <button
                        disabled={processing === item._id}
                        onClick={() => reviewKYC(item._id, "rejected")}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                      >
                        <XCircle size={17} />
                        Reject KYC
                      </button>
                    </div>
                  </div>
                )}

                {item.status === "rejected" && item.rejectionReason && (
                  <div className="border-t border-red-100 bg-red-50 p-5 text-sm text-red-700">
                    <strong>Rejection reason:</strong> {item.rejectionReason}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
