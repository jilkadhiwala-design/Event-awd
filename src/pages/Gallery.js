import React from "react";

const imgs = [
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop"
];

export default function Gallery() {
  return (
    <div className="page">
      <h2 className="text-3xl font-bold mb-4">Gallery</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {imgs.map((src, i) => (
          <img key={i} src={src} alt={"event-"+i} className="w-full h-56 object-cover rounded-2xl shadow" />
        ))}
      </div>
    </div>
  );
}
