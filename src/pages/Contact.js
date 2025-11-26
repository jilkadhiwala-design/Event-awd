import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validateValues = (values) => {
    const newErrors = {};

    if (!values.name.trim()) newErrors.name = "Name is required";

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!values.message.trim()) {
      newErrors.message = "Message is required";
    } else if (values.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  // handleChange updates form and runs validation immediately (real-time)
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);

    // real-time validation while typing
    const newErrors = validateValues(updated);
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateValues(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length) return;

    // successful submit action
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
    setErrors({});
  };

  // helper to add red border when a field currently has an error
  const inputClass = (field) =>
    `border rounded-xl px-4 py-2.5 ${
      errors[field] ? "border-red-500 ring-1 ring-red-200" : "border-gray-300"
    }`;

  return (
    <div className="page">
      <div className="max-w-xl card mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>

        <form className="grid gap-3" onSubmit={handleSubmit} noValidate>
          {/* NAME */}
          <input
            className={inputClass("name")}
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" className="text-red-500 text-sm">{errors.name}</p>}

          {/* EMAIL */}
          <input
            className={inputClass("email")}
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && <p id="email-error" className="text-red-500 text-sm">{errors.email}</p>}

          {/* MESSAGE */}
          <textarea
            className={inputClass("message")}
            rows="4"
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          ></textarea>
          {errors.message && <p id="message-error" className="text-red-500 text-sm">{errors.message}</p>}

          {/* SUBMIT */}
          <button className="btn btn-primary" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}