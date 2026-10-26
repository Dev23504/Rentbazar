import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  ShieldCheck,
} from "lucide-react";

const API = "https://rentbazar-backend.onrender.com";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setMessage(
          data.message ||
            `Login failed (${response.status}). Please check your details.`
        );
        return;
      }

      if (!data.token || !data.user) {
        setMessage("The server did not return a token and user information.");
        return;
      }

      if (data.user.role?.toLowerCase() === "admin") {
        setMessage("Please use the Admin Login page.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("authChanged"));

      navigate(location.state?.from?.pathname || "/", {
        replace: true,
      });
    } catch (error) {
      console.error("Login request failed:", error);
      setMessage(
        "Cannot connect to the server. Check your backend URL, CORS settings, and internet connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center px-4 py-10">
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-green-300/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-300/30 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white">
          <div className="text-center mb-7">
            <Link to="/" className="text-3xl font-extrabold text-green-600">
              RentBazar
            </Link>

            <div className="mx-auto mt-5 mb-4 w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
              <User size={32} className="text-green-700" />
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900">
              User Login
            </h1>
            <p className="text-gray-500 mt-2">
              Sign in to continue to RentBazar
            </p>
          </div>

          {message && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                  disabled={loading}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 disabled:opacity-60"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  disabled={loading}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-12 outline-none focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 disabled:opacity-60"
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
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={19} />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <Link
            to="/admin-login"
            className="w-full border border-green-200 text-green-700 hover:bg-green-50 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <ShieldCheck size={19} />
            Admin Login
          </Link>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-green-600 font-bold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}