import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const change = (e) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);

    // real-time validation
    const newErrors = validateValues(updated);
    setErrors(newErrors);
  };

  const validateValues = (values) => {
    let newErrors = {};

    if (!values.name.trim()) newErrors.name = "Name is required";

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!values.password) {
      newErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!values.confirm) {
      newErrors.confirm = "Confirm your password";
    } else if (values.password !== values.confirm) {
      newErrors.confirm = "Passwords do not match";
    }

    return newErrors;
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const submit = (e) => {
    e.preventDefault();

    const newErrors = validateValues(form);
    setErrors(newErrors);
    setTouched({ name: true, email: true, password: true, confirm: true });

    if (Object.keys(newErrors).length) return;
    
    localStorage.setItem("auth", "true");
    localStorage.setItem("userName", form.name);
    alert(`Registered ${form.name}`);
  };

  const inputClass = (field) => {
    const base = "border rounded-xl px-4 py-2.5 w-full focus:outline-none";

    if (errors[field] && touched[field]) return `${base} border-red-500 ring-1 ring-red-200`;
    if (!errors[field] && touched[field]) return `${base} border-green-500 ring-1 ring-green-200`;

    return `${base} border-gray-300`;
  };

  return (
    <div className="page">
      <div className="max-w-md card mx-auto p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Create Account</h2>

        <form className="grid gap-3" onSubmit={submit} noValidate>

          {/* Name */}
          <div>
            <input
              className={inputClass("name")}
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={change}
              onBlur={() => handleBlur("name")}
            />
            {errors.name && touched.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              className={inputClass("email")}
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={change}
              onBlur={() => handleBlur("email")}
            />
            {errors.email && touched.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              className={inputClass("password")}
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={change}
              onBlur={() => handleBlur("password")}
            />
            {errors.password && touched.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              className={inputClass("confirm")}
              name="confirm"
              type="password"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={change}
              onBlur={() => handleBlur("confirm")}
            />
            {errors.confirm && touched.confirm && (
              <p className="text-red-500 text-sm">{errors.confirm}</p>
            )}
          </div>

          <button className="btn btn-primary w-full" type="submit">
            Register
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-3 text-center">
          Sign in?{" "}
          <Link className="text-primary underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}