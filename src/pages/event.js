import React, { useEffect, useState } from "react";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error loading events:", err));
  }, []);

  return (
    <section className="page">
      <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {events.map((e) => (
          <div key={e.id} className="card">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{e.title}</h3>
              <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                {e.date}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{e.location}</p>
            <p className="text-sm mt-3">{e.desc}</p>
            <button className="mt-4 btn bg-white border">View Details</button>
          </div>
        ))}
      </div>
    </section>
  );
}
