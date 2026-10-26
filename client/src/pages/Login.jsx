import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  User,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL || "https://rentbazar-backend.onrender.com/api/auth/login";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Invalid email or password");
        return;
      }

      if (!data.user || !data.token) {
        setMessage("Login information was not received.");
        return;
      }

      if (data.user.role === "admin") {
        setMessage("Please use Admin Login for this account.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("authChanged"));

      navigate(location.state?.from?.pathname || "/", {
        replace: true,
      });
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4 py-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-green-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          <div className="mb-8 text-center">
            <Link to="/" className="text-3xl font-extrabold tracking-tight text-green-600">
              RentBazar
            </Link>

            <div className="mt-5 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100">
                <User size={34} className="text-green-600" />
              </div>
            </div>

            <h1 className="mt-5 text-3xl font-bold text-gray-800">
              Welcome Back
            </h1>
            <p className="mt-2 text-gray-500">
              Sign in to continue to your RentBazar account
            </p>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-xl border border-green-600 bg-green-600 py-3 font-semibold text-white shadow-lg"
            >
              <User size={18} />
              User Login
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin-login")}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 font-semibold text-gray-600 transition hover:border-green-400 hover:text-green-700"
            >
              <ShieldCheck size={18} />
              Admin Login
            </button>
          </div>

          {message && (
            <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={19} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={19} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 outline-none transition focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-3.5 font-bold text-white shadow-lg transition hover:from-green-700 hover:to-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In"}
              {!loading && <ArrowRight size={19} />}
            </button>
          </form>

          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">NEW TO RENTBAZAR?</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <p className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-green-600 hover:underline">
              Create Account
            </Link>
          </p>

          <p className="mt-7 text-center text-xs text-gray-400">
            🔒 Your login information is securely protected
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          © 2026 RentBazar. All rights reserved.
        </p>
      </div>
    </div>
  );
}