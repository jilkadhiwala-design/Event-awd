import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 text-center">
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-8">
        <div>
          <div className="inline-flex items-center gap-2">
            <span className="h-9 w-9 grid place-items-center rounded-xl bg-primary text-white font-bold">EM</span>
            <span className="font-semibold text-lg">Eventura</span>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Our College Event Management System is built to simplify the way college event are planned,organized and executed. From cultural fests and technical workshops to seminars and competitions,the platform ensures smooth coordination between students,faculty,and organizers.  
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:underline" to="/">Home</Link></li>
            <li><Link className="hover:underline" to="/about">About</Link></li>
            <li><Link className="hover:underline" to="/gallery">Gallery</Link></li>
            <li><Link className="hover:underline" to="/contact">Contact</Link></li>
            <li><Link className="hover:underline" to="/login">Login</Link></li>
            <li><Link className="hover:underline" to="/register">Register</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-600">support@eventura.com</p>
          <p className="text-sm text-gray-600">+91 9327633357</p>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Eventura. All rights reserved.
      </div>
    </footer>
  );
}
