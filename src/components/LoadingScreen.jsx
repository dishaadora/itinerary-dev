import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loadingAnimation from "../animations/loadinganime.json"; // Make sure the path is correct
import "./LoadingPage.css"; // Add this for CSS styles

const LoadingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/roadmap", {
        state: {
          selectedCity: location.state?.selectedCity,
          selectedPlaces: location.state?.selectedPlaces,
        },
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <div className="loading-page">
      <div className="loading-animation">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
      <h2 className="loading-title">Generating your travel roadmap...</h2>
      <p className="loading-subtext">Please wait while we prepare your itinerary.</p>
    </div>
  );
};

export default LoadingPage;
