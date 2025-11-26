import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", location: "", desc: "" });

  // edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Load events
  useEffect(() => {
    fetch("/events.json?time=" + Date.now(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        // ensure each event has an id
        const normalized = (data || []).map((ev) => ({
          id: ev.id || `srv-${(ev.title || "e").replace(/\s+/g, "-")}-${ev.date || Date.now()}`,
          ...ev,
        }));
        setEvents(normalized);
      })
      .catch((err) => console.error("Error loading events:", err));
  }, []);

  // Add or Save (edit) event
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;

    if (isEditing && editingId) {
      // Save edits
      const updated = events.map((ev) => (ev.id === editingId ? { ...ev, ...newEvent, id: editingId } : ev));
      setEvents(updated);
      // optionally persist: localStorage.setItem("events", JSON.stringify(updated));
      cancelEdit();
    } else {
      // Add new
      const eventWithId = { ...newEvent, id: `loc-${Date.now()}` };
      const updated = [...events, eventWithId];
      setEvents(updated);
      // optionally persist: localStorage.setItem("events", JSON.stringify(updated));
      setNewEvent({ title: "", date: "", location: "", desc: "" });
    }
  };

  // Start editing
  const startEdit = (id) => {
    const ev = events.find((x) => x.id === id);
    if (!ev) return;
    setNewEvent({ title: ev.title || "", date: ev.date || "", location: ev.location || "", desc: ev.desc || "" });
    setIsEditing(true);
    setEditingId(id);
    // scroll to top or focus if needed
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cancel editing
  const cancelEdit = () => {
    setIsEditing(false);
    setEditingId(null);
    setNewEvent({ title: "", date: "", location: "", desc: "" });
  };

  // Delete event
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    const updated = events.filter((ev) => ev.id !== id);
    setEvents(updated);
    // optionally persist: localStorage.setItem("events", JSON.stringify(updated));
    // If deleting the event currently being edited, cancel edit
    if (isEditing && editingId === id) cancelEdit();
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-pink-50 to-white border-b">
        <div className="page py-14">
          <div className="grid md:grid-cols-2 items-center gap-10">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Plan, Publish & Manage <span className="text-primary">Events</span> with Ease
              </h1>
              <p className="mt-4 text-gray-600">
                Create events, track registrations, and share updates — all in one simple interface.
              </p>
              <div className="mt-6 flex gap-3">
                <Link to="/register" className="btn btn-primary">Get Started</Link>
                <Link to="/about" className="btn bg-white border">Learn More</Link>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-3">{isEditing ? "Edit Event" : "Quick Add Event"}</h3>
              <form className="grid gap-3" onSubmit={handleSubmit}>
                <input className="border rounded-xl px-4 py-2.5" placeholder="Event Title"
                  value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} />

                <input type="date" className="border rounded-xl px-4 py-2.5"
                  value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} />

                <input className="border rounded-xl px-4 py-2.5" placeholder="Location"
                  value={newEvent.location} onChange={e => setNewEvent({ ...newEvent, location: e.target.value })} />

                <textarea className="border rounded-xl px-4 py-2.5" rows="3" placeholder="Description"
                  value={newEvent.desc} onChange={e => setNewEvent({ ...newEvent, desc: e.target.value })}></textarea>

                <div className="flex gap-3">
                  <button className="btn btn-primary" type="submit">{isEditing ? "Save Changes" : "Add Event"}</button>
                  {isEditing && <button type="button" className="btn bg-white border" onClick={cancelEdit}>Cancel</button>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="page">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((e) => (
            <div key={e.id} className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">{e.date}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{e.location}</p>
              <p className="text-sm mt-3">{e.desc}</p>

              <div className="mt-4 flex gap-2">
                <button className="btn bg-white border" onClick={() => startEdit(e.id)}>Edit</button>
                <button className="btn btn-danger bg-white border" onClick={() => handleDelete(e.id)}>Delete</button>
                <button className="ml-auto mt-0 btn bg-white border">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}