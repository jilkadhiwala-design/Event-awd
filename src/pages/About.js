import React from "react";

export default function About() {
  return (
   <div className="page ">
      
      <div className="max-w-4xl  mx-auto text-center">
        <h2 className="text-5xl-center font-bold mb-4">About Us</h2>
        <p className="text-gray-600">
        Welcome to Eventura – Your Smart Event Management Partner! 🎉
        At Eventura, we believe that every event is more than just a gathering – it’s a memory in the making. Our mission is to simplify event planning and management so you can focus on what truly matters: creating unforgettable experiences
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mt-6">
          <div className="card">
            <h3 className="font-semibold">🌟 What We Do</h3>
            <p className="text-sm text-gray-600 mt-1">We provide a smart platform where you can:

Explore upcoming events easily.

Register or book tickets in just a few clicks.

Stay updated with event schedules and details.

Manage your own events with simple tools.</p>
          </div>
          <div className="card">
            <h3 className="font-semibold">💡 Why Choose Us?</h3>
            <p className="text-sm text-gray-600 mt-1">✔ Easy-to-use and mobile-friendly
✔ Secure and reliable system
✔ Quick registration & booking process
✔ Tailored for students, professionals, and organizations
</p>
          </div> <div className="card">
            <h3 className="font-semibold">🔒 Secure & Reliable</h3>
            <p className="text-sm text-gray-600 mt-1">✔ All user data is safe, and the system works smoothly every time.

</p>
          </div>
            <div className="card">
            <h3 className="font-semibold">🎯 Our Vision</h3>
            <p className="text-sm text-gray-600 mt-1">To become the most trusted and user-friendly event management platform that connects people, ideas, and celebrations seamlessly.

</p>
          </div>
        </div>
      </div>
    </div>
  );
}
