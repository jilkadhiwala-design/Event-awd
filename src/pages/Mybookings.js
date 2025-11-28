import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem("auth") === "true";
    const email = localStorage.getItem("userEmail");

    if (!isAuth || !email) {
      alert("Please login to view your bookings.");
      navigate("/login");
      return;
    }

    const key = `bookings_${email}`;          // ⭐ SAME KEY
    const saved = localStorage.getItem(key);
    setBookings(saved ? JSON.parse(saved) : []);
  }, [navigate]);

  const handleCancel = (id) => {
    const email = localStorage.getItem("userEmail");
    if (!email) return;

    const key = `bookings_${email}`;
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  return (
    <div className="page py-10">
      <h1 className="text-3xl font-bold mb-6">My Booked Events</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600">
          You haven’t booked any events yet. Go to the Home page and click
          <span className="font-semibold"> “Book Event”</span>.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {bookings.map((e) => (
            <div key={e.id} className="card">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                  {e.date}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{e.location}</p>
              <p className="text-sm mt-3">{e.desc}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-green-600">
                  ✅ Booked
                </span>
                <button
                  className="btn bg-white border text-xs"
                  onClick={() => handleCancel(e.id)}>
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}