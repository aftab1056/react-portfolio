import { useState } from "react";
import axios from "axios";
import React from "react";
axios.defaults.withCredentials = true;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ NORMAL LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/login", {
        email,
        userpassword: password,
      });
      window.location.href = "/home";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // ✅ GOOGLE LOGIN
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-6 border rounded">

        <h2 className="text-xl mb-4 text-center">Login</h2>

        {/* ERROR */}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        {/* NORMAL LOGIN FORM */}
        <form onSubmit={handleSubmit}>
          <input
            className="w-full border p-2 mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-2 mb-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="bg-blue-500 text-white w-full py-2 rounded mb-3">
            Login
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t"></div>
          <span className="px-2 text-sm text-gray-500">OR</span>
          <div className="flex-1 border-t"></div>
        </div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border flex items-center justify-center gap-2 py-2 rounded hover:bg-gray-100"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="google"
            className="w-5 h-5"
          />
          Login with Google
        </button>

      </div>
    </div>
  );
}
