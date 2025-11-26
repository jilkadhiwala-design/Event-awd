import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const [userName, setUserName] = useState("");

  useEffect(() => {
  const loadName = () => {
    const name = localStorage.getItem("userName");
    setUserName(name || "");
  };

  // run initially
  loadName();

  // run whenever login or logout happens
  window.addEventListener("authChanged", loadName);

  return () => window.removeEventListener("authChanged", loadName);
}, []);
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
          &nbsp;&nbsp;&nbsp;{userName && (
            <span className="font-semibold text-primary">
              Hello, {userName}
            </span>
          )}
        </nav>
        {!userName && (
          <div className="hidden md:flex items-center gap-2">
          <NavItem to="/login">Login</NavItem>
          <Link to="/register" className="btn btn-primary">Register</Link>
        </div>  
        )}
        {userName && (
          <button
            onClick={() => {
              localStorage.removeItem("auth");
              localStorage.removeItem("userName");
              setUserName("");
              window.location.reload(); // refresh navbar instantly
            }}
            className="hidden md:block px-3 py-2 rounded-lg text-sm font-medium bg-pink-500 text-white hover:bg-pink-600 ml-3">
            Logout
          </button>
        )}
      </div>
    </header>
  );
}