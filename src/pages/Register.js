import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name is required";

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirm) {
      newErrors.confirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert(`Registered ${form.name}`);
  };

  return (
    <div className="page">
      <div className="max-w-md card mx-auto p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Create Account</h2>
        <form className="grid gap-3" onSubmit={submit}>
          
          <div>
            <input
              className="border rounded-xl px-4 py-2.5 w-full"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={change}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <input
              className="border rounded-xl px-4 py-2.5 w-full"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={change}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <input
              className="border rounded-xl px-4 py-2.5 w-full"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={change}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <input
              className="border rounded-xl px-4 py-2.5 w-full"
              name="confirm"
              type="password"
              placeholder="Confirm Password"
              value={form.confirm}
              onChange={change}
            />
            {errors.confirm && <p className="text-red-500 text-sm">{errors.confirm}</p>}
          </div>

          <button className="btn btn-primary w-full" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
