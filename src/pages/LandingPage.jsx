import React, { useState }from "react";
import { useNavigate } from "react-router-dom";
import "../components/LandingPage.css";
import { BiColor } from "react-icons/bi";
import Lottie from "lottie-react";
import logoAnimation from "../animations/welcome.json";

export default function LandingPage() {
  const navigate = useNavigate();
  const [showContact, setShowContact] = useState(false); // ✅ contact toggle state

  // ✅ Toggle function must be inside the component
  const handleToggleContact = () => {
    setShowContact(!showContact);
  };

  return (
    <div className="landing-container">
      <div className="contact-container">
        <button className={`contact-icon ${showContact ? 'active' : ''}`} onClick={handleToggleContact}>
          Contact Us
        </button>
        {showContact && (
          <div className="contact-popup">
            <p>Phone: +91 63718 24126</p>
            <p>Or mail us at <span className="email">support@travelplanner.com</span></p>
          </div>
        )}
      </div>
      <Lottie 
        animationData={logoAnimation} 
        loop={true} 
        className="logo" 
      />
      <h1 className="title">Welcome to Travel Planner</h1>
      <p className="subtitle">Leave all the stress to us and enjoy the trip!</p>
      <p className="description">
        We will provide you with the best travel itinerary curated your way.
      </p>
      <h2>Topic: Interactive itinerary board with drag-to-reorder day plans</h2>
      <button onClick={() => navigate("/planner")} className="get-started">
        Get Started
      </button>
    </div>

  );
}
