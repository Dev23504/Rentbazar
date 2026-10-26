
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

const API = "https://rentbazar-backend.onrender.com";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Invalid email or password.");
        return;
      }

      if (!data.user || !data.token) {
        setMessage("Login information was not received.");
        return;
      }

      if (data.user.role?.toLowerCase() !== "admin") {
        setMessage("This account does not have admin access.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("authChanged"));

      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("Admin Login Error:", error);
      setMessage(
        "Server connection failed. Please check your internet and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-emerald-950 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl border border-white/20 p-8 sm:p-10">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-green-700"
          >
            <ArrowLeft size={17} />
            Back to User Login
          </Link>

          <div className="text-center mt-7 mb-8">
            <Link
              to="/"
              className="inline-block text-3xl font-extrabold text-green-600 tracking-tight"
            >
              RentBazar
            </Link>

            <div className="mt-5 flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center shadow-inner">
                <ShieldCheck size={42} className="text-green-700" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mt-5">
              Admin Login
            </h1>
            <p className="text-gray-500 mt-2">
              Sign in to access the administration panel
            </p>
          </div>

          {message && (
            <div
              role="alert"
              className="mb-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Admin Email
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="Enter admin email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-12 outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-60 text-white py-3.5 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? "Signing In..." : "Admin Sign In"}
              {!loading && <ArrowRight size={19} />}
            </button>
          </form>

          <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-4 text-center">
            <ShieldCheck
              size={22}
              className="mx-auto text-green-700 mb-2"
            />
            <p className="text-sm text-green-800">
              Restricted access for authorized administrators only.
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          © 2026 RentBazar. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
