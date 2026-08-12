import React, { useState } from "react";
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

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("user");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Invalid email or password");
        return;
      }

      if (!data.user) {
        setMessage("User information not received.");
        return;
      }

      const userRole = data.user.role || "user";

      if (loginType === "admin" && userRole !== "admin") {
        setMessage("This account does not have admin access.");
        return;
      }

      if (loginType === "user" && userRole === "admin") {
        setMessage("Please use Admin Login for this account.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      window.dispatchEvent(new Event("authChanged"));

      if (userRole === "admin") {
        navigate("/admin", {
          replace: true,
        });
      } else {
        const redirectPath =
          location.state?.from?.pathname || "/";

        navigate(redirectPath, {
          replace: true,
        });
      }
    } catch (error) {
      console.error("Login Error:", error);

      setMessage(
        "Server connection failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100 flex items-center justify-center px-4 py-10">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute -top-24 -left-24 w-80 h-80 bg-green-300/30 rounded-full blur-3xl animate-pulse" />

        <div
          className="absolute top-1/2 -right-32 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div
          className="absolute -bottom-32 left-1/3 w-80 h-80 bg-green-200/40 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />

      </div>

      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/60 p-8 sm:p-10 animate-[fadeIn_0.6s_ease-out]">

          <div className="text-center mb-8">

            <Link
              to="/"
              className="inline-block text-3xl font-extrabold text-green-600 tracking-tight hover:scale-105 transition-transform duration-300"
            >
              RentBazar
            </Link>

            <div className="mt-4 flex justify-center">

              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center shadow-inner">
                {loginType === "admin" ? (
                  <ShieldCheck
                    size={34}
                    className="text-green-600"
                  />
                ) : (
                  <User
                    size={34}
                    className="text-green-600"
                  />
                )}
              </div>

            </div>

            <h2 className="text-3xl font-bold text-gray-800 mt-5">
              {loginType === "admin"
                ? "Admin Login"
                : "Welcome Back"}
            </h2>

            <p className="text-gray-500 mt-2">
              {loginType === "admin"
                ? "Sign in to access your RentBazar admin panel"
                : "Sign in to continue to your RentBazar account"}
            </p>

          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">

            <button
              type="button"
              onClick={() => {
                setLoginType("user");
                setMessage("");
              }}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold border transition-all ${
                loginType === "user"
                  ? "bg-green-600 text-white border-green-600 shadow-lg"
                  : "bg-white text-gray-600 border-gray-200 hover:border-green-400"
              }`}
            >
              <User size={18} />
              User Login
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginType("admin");
                setMessage("");
              }}
              className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold border transition-all ${
                loginType === "admin"
                  ? "bg-green-600 text-white border-green-600 shadow-lg"
                  : "bg-white text-gray-600 border-gray-200 hover:border-green-400"
              }`}
            >
              <ShieldCheck size={18} />
              Admin Login
            </button>

          </div>

          {message && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-[shake_0.3s_ease-in-out]">
              <span>⚠️</span>
              <span>{message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative group">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition"
                />

                <input
                  type="email"
                  placeholder={
                    loginType === "admin"
                      ? "Enter admin email"
                      : "Enter your email"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-4 outline-none transition-all duration-300 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 hover:border-green-300"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative group">

                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full border border-gray-200 bg-gray-50 rounded-xl py-3.5 pl-11 pr-12 outline-none transition-all duration-300 focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-100 hover:border-green-300"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-green-200 hover:shadow-green-300 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >

              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  {loginType === "admin"
                    ? "Admin Sign In"
                    : "Sign In"}

                  <ArrowRight
                    size={19}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}

            </button>

          </form>

          {loginType === "user" && (
            <>
              <div className="flex items-center gap-3 my-7">

                <div className="h-px bg-gray-200 flex-1" />

                <span className="text-xs text-gray-400">
                  NEW TO RENTBAZAR?
                </span>

                <div className="h-px bg-gray-200 flex-1" />

              </div>

              <p className="text-center text-gray-600">

                Don't have an account?{" "}

                <Link
                  to="/signup"
                  className="text-green-600 font-bold hover:text-green-700 hover:underline transition"
                >
                  Create Account
                </Link>

              </p>
            </>
          )}

          {loginType === "admin" && (
            <div className="mt-6 bg-green-50 border border-green-100 rounded-xl p-4 text-center">

              <ShieldCheck
                size={22}
                className="mx-auto text-green-600 mb-2"
              />

              <p className="text-sm text-green-700 font-medium">
                Admin access is restricted to authorized accounts.
              </p>

            </div>
          )}

          <div className="mt-7 text-center">

            <p className="text-xs text-gray-400">
              🔒 Your login information is securely protected
            </p>

          </div>

        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2026 RentBazar. All rights reserved.
        </p>

      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(25px) scale(0.97);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes shake {
            0%, 100% {
              transform: translateX(0);
            }

            25% {
              transform: translateX(-5px);
            }

            75% {
              transform: translateX(5px);
            }
          }
        `}
      </style>

    </div>
  );
};

export default Login;