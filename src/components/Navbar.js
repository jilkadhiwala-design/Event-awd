import React from "react";
import { NavLink, Link } from "react-router-dom";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-lg text-sm font-medium ${isActive ? "bg-primary text-white" : "text-gray-700 hover:bg-blue-50"}`
    }
  >
    {children}
  </NavLink>
);

export default function Navbar() {
  return (
    <header className="bg-white/90 backdrop-blur sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="inline-flex items-center gap-2">
          <span className="h-9 w-9 grid place-items-center rounded-xl bg-primary text-white font-bold">EM</span>
          <div className="font-semibold text-lg">Eventura</div>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/gallery">Gallery</NavItem>
          <NavItem to="/contact">Contact</NavItem>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <NavItem to="/login">Login</NavItem>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>
      </div>
    </header>
  );
}
