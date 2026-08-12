import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      const response = await fetch(
        "https://rentbazar-backend.onrender.com//api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (error) {
      setMessage("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Sign in to your RentBazar account
        </p>

        {message && (
          <p className="bg-red-100 text-red-600 p-3 rounded-lg mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-lg p-3 mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-lg p-3 mb-5"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-green-600 font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;