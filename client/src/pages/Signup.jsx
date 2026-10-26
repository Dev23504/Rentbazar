
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const API = "https://rentbazar-backend.onrender.com";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email || !formData.password || !formData.confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setMessage(data.message || "Signup failed. Please try again.");
        return;
      }

      if (!data.token || !data.user) {
        setMessage(
          data.message ||
            "Account response received, but login information is missing. Please sign in."
        );
        setMessageType("error");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("authChanged"));

      setMessageType("success");
      setMessage("Account created successfully!");

      navigate("/", { replace: true });
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage(
        "Server connection failed. Please check your internet and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center px-4 py-10">
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-green-300/30 rounded-full blur-3xl animate-pulse" />

      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-emerald-300/30 rounded-full blur-3xl animate-pulse" />

      <div className="absolute top-1/4 right-10 w-16 h-16 bg-green-200/40 rounded-full blur-xl animate-bounce" />

      <div className="relative w-full max-w-md">
        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl blur opacity-20" />

        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/70">
          <div className="text-center mb-7">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-200 mb-4 hover:rotate-6 transition-transform duration-300">
              <span className="text-white text-2xl font-extrabold">R</span>
            </div>

            <h2 className="text-3xl font-extrabold text-gray-900">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Join RentBazar and start renting today
            </p>
          </div>

          {message && (
            <div
              role="alert"
              aria-live="polite"
              className={`mb-5 p-3 rounded-xl border text-sm text-center ${
                messageType === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative group">
              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition"
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                maxLength={100}
                required
                disabled={loading}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all duration-300 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 disabled:opacity-60"
              />
            </div>

            <div className="relative group">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
                disabled={loading}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all duration-300 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 disabled:opacity-60"
              />
            </div>

            <div className="relative group">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password (minimum 6 characters)"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={6}
                required
                disabled={loading}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-12 outline-none transition-all duration-300 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </div>

            <div className="relative group">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition"
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
                disabled={loading}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 pl-11 pr-12 outline-none transition-all duration-300 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight
                    size={19}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-xs text-gray-400">OR</span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-bold hover:text-green-700 hover:underline transition"
            >
              Sign In
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-5">
            By creating an account, you agree to RentBazar's terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
