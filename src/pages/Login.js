import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let newErrors = {};

    // Email validation
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    // If no errors, return true
    return Object.keys(newErrors).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();

    if (!validate()) return; // Stop submit if errors exist

    alert(`Logged in as ${email}`);
    navigate("/"); // redirect to Home page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
      <div className="max-w-md w-full card p-6 shadow-lg rounded-2xl bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Login
        </h2>
        <form className="grid gap-4" onSubmit={submit}>
          {/* Email input */}
          <div>
            <input
              className="border rounded-xl px-4 py-2.5 w-full"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password input */}
          <div>
            <input
              className="border rounded-xl px-4 py-2.5 w-full"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            className="btn btn-primary w-full py-2 rounded-xl font-semibold"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-3 text-center">
          No account?{" "}
          <Link className="text-primary underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
