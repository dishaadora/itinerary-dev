import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onSelectCity }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // ✅ Add this line

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="navbar">
      <FaBars className="hamburger-icon" onClick={toggleMenu} />

      {isOpen && (
        <div className="sidebar">
          <button
            onClick={() => {
              setIsOpen(false);
              navigate('/planner'); // ✅ Ensure '/planner' is a valid route in your router
            }}
          >
            Select City
          </button>
          <button onClick={() => alert("Feature coming soon!")}>
            My Trips
          </button>
          <button onClick={() => alert("This app helps users plan trips with a roadmap based on selected places.")}>
            About Us
          </button>
        </div>
      )}
    </div>
  );
}
