import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const validateValues = ({ email, password }) => {
    const newErrors = {};

    if (!email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // LIVE VALIDATION
  useEffect(() => {
    const newErrors = validateValues({ email, password });
    setErrors(newErrors);
  }, [email, password]);

  const inputClass = (field) => {
    const base = "border rounded-xl px-4 py-2.5 w-full focus:outline-none";
    if (errors[field] && touched[field])
      return `${base} border-red-500 ring-1 ring-red-200`;
    if (!errors[field] && touched[field])
      return `${base} border-green-500 ring-1 ring-green-200`;
    return `${base} border-gray-300`;
  };

  const submit = async (e) => {
    e.preventDefault();

    const newErrors = validateValues({ email, password });
    setErrors(newErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(newErrors).length) return;

    // ✅ check registered users from localStorage
    const stored = localStorage.getItem("users");
    const users = stored ? JSON.parse(stored) : [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      // not registered or wrong password
      setSuccessMsg("");
      setLoginError("Invalid email or password, or user is not registered.");
      return;
    }

    try {
      setSubmitting(true);
      setSuccessMsg("");
      setLoginError("");

      // fake delay (optional)
      await new Promise((r) => setTimeout(r, 600));

      // ✔ SAVE LOGIN INFO HERE
      localStorage.setItem("auth", "true");
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);

      setSuccessMsg(`Logged in as ${user.name}`);
      setEmail("");
      setPassword("");
      setTouched({});

      // notify other components navbar / home
      window.dispatchEvent(new Event("authChanged"));

      // go to home
      navigate("/");
    } catch (err) {
      setLoginError("Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
      <div className="max-w-md w-full card p-6 shadow-lg rounded-2xl bg-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">
          Login
        </h2>

        {successMsg && (
          <div className="mb-3 p-3 rounded bg-green-100 text-green-800">
            {successMsg}
          </div>
        )}

        {loginError && (
          <div className="mb-3 p-3 rounded bg-red-100 text-red-800">
            {loginError}
          </div>
        )}

        <form className="grid gap-4" onSubmit={submit} noValidate>
          {/* Email */}
          <div>
            <input
              className={inputClass("email")}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              aria-invalid={!!errors.email}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              className={inputClass("password")}
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              aria-invalid={!!errors.password}
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            className="btn btn-primary w-full py-2 rounded-xl font-semibold flex items-center justify-center"
            type="submit"
          >
            {submitting ? (
              <>
                <span className="spinner-border animate-spin w-4 h-4 mr-2"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-3 text-center">
          Sign up?{" "}
          <Link className="text-primary underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}