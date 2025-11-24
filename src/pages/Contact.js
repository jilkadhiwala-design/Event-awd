import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); alert("Message sent!"); setForm({ name:"", email:"", message:"" }); };

  return (
    <div className="page">
      <div className="max-w-xl card mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <input className="border rounded-xl px-4 py-2.5" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
          <input className="border rounded-xl px-4 py-2.5" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <textarea className="border rounded-xl px-4 py-2.5" rows="4" name="message" placeholder="Message" value={form.message} onChange={handleChange}></textarea>
          <button className="btn btn-primary" type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}
