import { useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [showVerify, setShowVerify] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        userpassword: password,
      });
      setMessage(res.data.message);
      setShowVerify(true);
    } catch (err) {
  if (err.response) {
    setMessage(err.response.data.message);
  } else {
    setMessage("Server error. Please try again later.");
    console.error(err);
  }
}

  };

  const verifyEmail = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/verify-email", {
        email,
        code,
      });
      alert("Email verified successfully");
      navigate("/login");
    } catch (err) {
      alert("Invalid verification code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 p-6 border rounded">
        <h2 className="text-xl ">Register</h2>
        {/* LOGIN BUTTON TOP RIGHT */}
   <div className="w-90  flex justify-end  mt-[-30px]">
    <button
      onClick={() => navigate("/login")}
      className="bg-green-500 text-white px-4 py-1 rounded mb-5  "
    >
      Login
    </button>
  </div>


        {message && <p>{message}</p>}
       <input
  className="w-full border p-2 mb-3"
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>

<input
  className="w-full border p-2 mb-3"
  placeholder="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

<input
  type="password"
  className="w-full border p-2 mb-3"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

        <button className="bg-green-500 text-white w-full py-2">Register</button>
      
      </form>
      {showVerify && (
        <div>
          <h3>Verify Email</h3>
          <input type="text" placeholder="Enter verification code" value={code} onChange={(e) => setCode(e.target.value)} />
          <button onClick={verifyEmail}>Verify</button>
        </div>
      )}
    </div>
  );
}
