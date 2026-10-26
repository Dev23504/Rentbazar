import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  ShieldCheck,
  FileCheck2,
  UploadCloud,
  Camera,
  IdCard,
  FileText,
  RefreshCw,
  X,
} from "lucide-react";
import products from "../data/product";

const imageFallback =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="#E4ECE2"/><text x="50%" y="50%" fill="#6B7F73" font-family="sans-serif" font-size="28" text-anchor="middle" dominant-baseline="middle">Image not available</text></svg>`
  );

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const SECURITY_DEPOSIT = 500;

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-leaf-600 focus:ring-2 focus:ring-leaf-600/30";

const formatINR = (value) => `₹${Number(value).toLocaleString("en-IN")}`;

const getDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 0;
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (end < start) return 0;
  return Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
};

/* ─── FileField ─── */
const FileField = ({ icon: Icon, label, name, accept, file, hint, onChange }) => (
  <label
    className={`block cursor-pointer rounded-2xl border-2 border-dashed p-5 transition-colors ${
      file
        ? "border-leaf-600 bg-sage-50"
        : "border-slate-300 bg-white hover:border-leaf-600"
    }`}
  >
    <div className="flex items-start gap-4">
      <div
        className={`h-11 w-11 shrink-0 rounded-full flex items-center justify-center ${
          file ? "bg-leaf-600 text-white" : "bg-sage-100 text-leaf-600"
        }`}
      >
        {file ? <FileCheck2 size={22} /> : <Icon size={22} />}
      </div>

      <div className="min-w-0">
        <p className="font-semibold text-slate-900">{label}</p>

        {file ? (
          <p className="mt-1 text-sm text-leaf-700 truncate">
            {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
          </p>
        ) : (
          <p className="mt-1 text-sm text-slate-500 flex items-center gap-1">
            <UploadCloud size={15} /> Tap to choose a file
          </p>
        )}

        <p className="mt-1 text-xs text-slate-500">{hint}</p>
      </div>
    </div>

    <input
      required
      type="file"
      name={name}
      accept={accept}
      onChange={onChange}
      className="sr-only"
    />
  </label>
);

/* ─── LiveSelfie: webcam se seedha photo ─── */
const LiveSelfie = ({ onCapture, captured, onRetake }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [camError, setCamError] = useState("");
  const [facingMode, setFacingMode] = useState("user"); // user = front, environment = back

  const startCamera = useCallback(async (mode = "user") => {
    // pehle purana stream band karo
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
    }
    setCamError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraOn(true);
    } catch (err) {
      if (err.name === "NotAllowedError") {
        setCamError("Camera permission denied. Please allow camera access in your browser settings.");
      } else if (err.name === "NotFoundError") {
        setCamError("No camera found on this device.");
      } else {
        setCamError("Could not start camera: " + err.message);
      }
    }
  }, []);

  // component unmount pe camera band karo
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    // front camera me mirror effect hota hai — canvas me flip karke save karo
    if (facingMode === "user") {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], "selfie.jpg", { type: "image/jpeg" });
        const previewUrl = canvas.toDataURL("image/jpeg", 0.9);
        onCapture(file, previewUrl);

        // camera band karo
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
        }
        setCameraOn(false);
      },
      "image/jpeg",
      0.9
    );
  };

  const handleRetake = () => {
    onRetake();
    startCamera(facingMode);
  };

  const toggleCamera = () => {
    const newMode = facingMode === "user" ? "environment" : "user";
    setFacingMode(newMode);
    startCamera(newMode);
  };

  // agar photo le li hai to preview dikhao
  if (captured) {
    return (
      <div className="md:col-span-2 rounded-2xl border-2 border-leaf-600 bg-sage-50 p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-11 w-11 rounded-full bg-leaf-600 text-white flex items-center justify-center">
            <FileCheck2 size={22} />
          </div>
          <div>
            <p className="font-semibold text-slate-900">Live Selfie</p>
            <p className="text-sm text-leaf-700">Photo captured successfully</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <img
            src={captured}
            alt="Your selfie"
            className="h-28 w-28 rounded-xl object-cover border-2 border-leaf-600"
          />
          <button
            type="button"
            onClick={handleRetake}
            className="flex items-center gap-2 text-sm font-semibold text-leaf-600 hover:text-leaf-700 border border-leaf-600 rounded-xl px-4 py-2 transition-colors"
          >
            <RefreshCw size={16} />
            Retake
          </button>
        </div>
      </div>
    );
  }

  // camera on hai to stream dikhao
  if (cameraOn) {
    return (
      <div className="md:col-span-2 rounded-2xl border-2 border-forest-900 bg-slate-900 overflow-hidden">
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full max-h-72 object-cover"
            style={{ transform: facingMode === "user" ? "scaleX(-1)" : "none" }}
          />

          {/* oval face guide */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-36 h-44 rounded-full border-4 border-white/60 border-dashed" />
          </div>

          <button
            type="button"
            onClick={toggleCamera}
            title="Switch camera"
            className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          >
            <RefreshCw size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between px-5 py-4 bg-slate-900">
          <p className="text-sm text-slate-300">Align your face in the oval</p>

          <button
            type="button"
            onClick={handleCapture}
            className="h-14 w-14 rounded-full bg-white hover:bg-slate-100 border-4 border-slate-400 flex items-center justify-center transition-colors"
            title="Capture photo"
          >
            <Camera size={24} className="text-slate-800" />
          </button>

          <button
            type="button"
            onClick={() => {
              if (streamRef.current) {
                streamRef.current.getTracks().forEach((t) => t.stop());
              }
              setCameraOn(false);
            }}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    );
  }

  // default: "Open Camera" button
  return (
    <div className="md:col-span-2">
      {camError && (
        <div className="mb-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {camError}
        </div>
      )}

      <button
        type="button"
        onClick={() => startCamera(facingMode)}
        className="w-full rounded-2xl border-2 border-dashed border-slate-300 bg-white hover:border-leaf-600 p-6 transition-colors flex flex-col items-center gap-3"
      >
        <div className="h-14 w-14 rounded-full bg-sage-100 text-leaf-600 flex items-center justify-center">
          <Camera size={28} />
        </div>
        <div className="text-center">
          <p className="font-semibold text-slate-900">Take Live Selfie</p>
          <p className="text-sm text-slate-500 mt-1">
            Opens webcam / front camera in browser. No gallery upload allowed.
          </p>
        </div>
      </button>
    </div>
  );
};

/* ─── Main Component ─── */
const RentalForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const userProducts = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("userProducts") || "[]");
    } catch {
      return [];
    }
  }, []);

  const product = [...products, ...userProducts].find(
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

  const [documents, setDocuments] = useState({
    drivingLicense: null,
    addressProof: null,
    selfie: null,
  });

  const [selfiePreview, setSelfiePreview] = useState(null);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, WEBP, or PDF file.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Each document must be smaller than 5 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setDocuments((prev) => ({ ...prev, [name]: file }));
  };

  const handleSelfieCapture = (file, previewUrl) => {
    setDocuments((prev) => ({ ...prev, selfie: file }));
    setSelfiePreview(previewUrl);
  };

  const handleSelfieRetake = () => {
    setDocuments((prev) => ({ ...prev, selfie: null }));
    setSelfiePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!product) { setError("Product not found."); return; }

    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.address.trim() || !formData.startDate || !formData.endDate) {
      setError("Please fill all personal details and rental dates.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!documents.drivingLicense || !documents.addressProof || !documents.selfie) {
      setError("Upload your driving licence, address proof, and take a live selfie.");
      return;
    }

    if (!consent) { setError("Please provide consent for identity verification."); return; }

    const start = new Date(`${formData.startDate}T00:00:00`);
    const end = new Date(`${formData.endDate}T00:00:00`);

    if (start < new Date(`${today}T00:00:00`)) { setError("Start date cannot be in the past."); return; }
    if (end < start) { setError("End date cannot be before start date."); return; }

    const days = getDays(formData.startDate, formData.endDate);
    const subtotal = Number(product.price) * days;
    const total = subtotal + SECURITY_DEPOSIT;

    const rentalData = {
      product: {
        id: product.id, title: product.title, category: product.category,
        location: product.location, image: product.image,
        price: Number(product.price), rating: product.rating || 5,
        owner: {
          name: product.owner?.name || "N/A",
          phone: product.owner?.phone || "N/A",
          email: product.owner?.email || "N/A",
        },
      },
      customer: {
        name: formData.name.trim(), phone: formData.phone.trim(),
        email: formData.email.trim(), address: formData.address.trim(),
        startDate: formData.startDate, endDate: formData.endDate,
      },
      days, subtotal, securityDeposit: SECURITY_DEPOSIT, total,
      paymentMethod: "", paymentId: "", orderId: "", signature: "",
      bookingId: "", bookingDate: "", status: "Pending", verificationStatus: "pending",
    };

    const body = new FormData();
    body.append("name", formData.name.trim());
    body.append("phone", formData.phone.trim());
    body.append("email", formData.email.trim());
    body.append("address", formData.address.trim());
    body.append("productId", String(product.id));
    body.append("drivingLicense", documents.drivingLicense);
    body.append("addressProof", documents.addressProof);
    body.append("selfie", documents.selfie);

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/kyc/submit`, {
        method: "POST", body, credentials: "include",
      });

      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "KYC submission failed.");

      rentalData.verificationId = result.verificationId || "";
      rentalData.verificationStatus = result.status || "pending";

      localStorage.setItem("rentalData", JSON.stringify(rentalData));

      if (result.status === "verified") {
        navigate(`/payment/${product.id}`);
      } else {
        navigate(`/kyc-status/${result.verificationId || ""}`);
      }
    } catch (err) {
      setError(err.message || "Could not submit verification. Check that the backend KYC endpoint is running.");
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-forest-900">Item not found</h2>
          <button
            onClick={() => navigate("/rentals")}
            className="mt-6 rounded-xl bg-leaf-600 px-6 py-3 font-semibold text-white hover:bg-leaf-700 transition-colors"
          >
            Browse rentals
          </button>
        </div>
      </div>
    );
  }

  const days = getDays(formData.startDate, formData.endDate);
  const subtotal = Number(product.price) * days;
  const total = days ? subtotal + SECURITY_DEPOSIT : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 hover:text-leaf-600 mb-6 font-medium transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <h1 className="text-3xl md:text-4xl font-extrabold text-forest-900">
        Rent {product.title}
      </h1>
      <p className="mt-2 text-slate-600">
        Add your details, upload your documents and take a live selfie.
      </p>

      {error && (
        <div role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 grid lg:grid-cols-12 gap-8 items-start">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-8">

          {/* Personal Details */}
          <section className="bg-white border border-sage-100 rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900">Your details</h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <label className="font-semibold text-sm">
                Full name
                <input required type="text" name="name" value={formData.name} onChange={handleChange}
                  autoComplete="name" placeholder="As on your ID" className={inputClass} />
              </label>

              <label className="font-semibold text-sm">
                Mobile number
                <input required type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  maxLength={10} inputMode="numeric" placeholder="10-digit mobile number" className={inputClass} />
              </label>

              <label className="font-semibold text-sm">
                Email address
                <input required type="email" name="email" value={formData.email} onChange={handleChange}
                  autoComplete="email" placeholder="you@example.com" className={inputClass} />
              </label>

              <label className="font-semibold text-sm">
                Current address
                <textarea required name="address" value={formData.address} onChange={handleChange}
                  rows={3} placeholder="House no., street, city, PIN code" className={inputClass} />
              </label>
            </div>
          </section>

          {/* KYC / Identity */}
          <section className="bg-white border border-sage-100 rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900">Identity verification</h2>

            <p className="mt-2 text-sm text-slate-600 max-w-xl">
              Upload your driving licence and address proof. Then take a live selfie directly in the browser — gallery photos are not accepted.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <FileField
                icon={IdCard} label="Driving licence" name="drivingLicense"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                file={documents.drivingLicense} hint="JPG, PNG, WEBP or PDF. Max 5 MB."
                onChange={handleFileChange}
              />

              <FileField
                icon={FileText} label="Address proof" name="addressProof"
                accept="image/jpeg,image/png,image/webp,application/pdf"
                file={documents.addressProof} hint="Any accepted address-proof document. Max 5 MB."
                onChange={handleFileChange}
              />

              {/* Live Selfie — webcam se */}
              <LiveSelfie
                onCapture={handleSelfieCapture}
                captured={selfiePreview}
                onRetake={handleSelfieRetake}
              />
            </div>

            <label className="mt-6 flex items-start gap-3 text-sm text-slate-700 cursor-pointer">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 h-4 w-4 accent-leaf-600" />
              <span>
                I agree to RentBazar processing these documents and my live selfie to verify my identity for this rental, as described in the privacy policy.
              </span>
            </label>
          </section>

          {/* Rental Dates */}
          <section className="bg-white border border-sage-100 rounded-3xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-slate-900">Rental dates</h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <label className="font-semibold text-sm">
                Start date
                <input required type="date" name="startDate" value={formData.startDate}
                  min={today} onChange={handleChange} className={inputClass} />
              </label>

              <label className="font-semibold text-sm">
                End date
                <input required type="date" name="endDate" value={formData.endDate}
                  min={formData.startDate || today} onChange={handleChange} className={inputClass} />
              </label>
            </div>
          </section>
        </div>

        {/* RIGHT sticky summary */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="bg-white border border-sage-100 rounded-3xl overflow-hidden">
            <img
              src={product.image} alt={product.title}
              className="h-44 w-full object-cover bg-sage-100"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = imageFallback; }}
            />

            <div className="p-6">
              <h3 className="text-xl font-bold text-slate-900">{product.title}</h3>

              <p className="mt-1 text-sm text-slate-500 flex items-center gap-1">
                <MapPin size={14} />
                {product.location} · {product.category}
              </p>

              {product.owner?.name && (
                <p className="mt-1 text-sm text-slate-500">Listed by {product.owner.name}</p>
              )}

              <div className="mt-5 space-y-3 text-sm border-t border-sage-100 pt-5">
                <div className="flex justify-between">
                  <span className="text-slate-600">Price per day</span>
                  <span className="font-semibold">{formatINR(product.price)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Days</span>
                  <span className="font-semibold">{days || "Choose dates"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Rental</span>
                  <span className="font-semibold">{days ? formatINR(subtotal) : "-"}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600">Security deposit</span>
                  <span className="font-semibold">{formatINR(SECURITY_DEPOSIT)}</span>
                </div>

                <div className="flex justify-between border-t border-sage-100 pt-4 text-base">
                  <span className="font-bold">Total</span>
                  <span className="font-extrabold text-forest-900">{days ? formatINR(total) : "-"}</span>
                </div>
              </div>

              <button
                type="submit" disabled={loading}
                className="mt-6 w-full rounded-xl bg-marigold-400 hover:bg-marigold-500 py-4 text-lg font-bold text-forest-900 transition-colors disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting for verification..." : "Verify and continue"}
              </button>

              <p className="mt-4 flex items-start gap-2 text-xs text-slate-500">
                <ShieldCheck size={16} className="text-leaf-600 shrink-0" />
                You pay only after your documents are verified.
              </p>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
};

export default RentalForm;