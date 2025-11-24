import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", location: "", desc: "" });

  // Load data from JSON file
  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error loading events:", err));
  }, []);

  // Add new event manually
  const addEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    setEvents([...events, newEvent]);
    setNewEvent({ title: "", date: "", location: "", desc: "" });
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
              <h3 className="text-lg font-semibold mb-3">Quick Add Event</h3>
              <form className="grid gap-3" onSubmit={addEvent}>
                <input className="border rounded-xl px-4 py-2.5" placeholder="Event Title" value={newEvent.title} onChange={e=>setNewEvent({...newEvent, title:e.target.value})} />
                <input type="date" className="border rounded-xl px-4 py-2.5" value={newEvent.date} onChange={e=>setNewEvent({...newEvent, date:e.target.value})} />
                <input className="border rounded-xl px-4 py-2.5" placeholder="Location" value={newEvent.location} onChange={e=>setNewEvent({...newEvent, location:e.target.value})} />
                <textarea className="border rounded-xl px-4 py-2.5" rows="3" placeholder="Description" value={newEvent.desc} onChange={e=>setNewEvent({...newEvent, desc:e.target.value})}></textarea>
                <button className="btn btn-primary" type="submit">Add Event</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Events list */}
      <section className="page">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((e, i) => (
            <div key={i} className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">{e.date}</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{e.location}</p>
              <p className="text-sm mt-3">{e.desc}</p>
              <button className="mt-4 btn bg-white border">View Details</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
