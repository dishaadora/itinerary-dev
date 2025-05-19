import React from "react";
import { useLocation } from "react-router-dom";
import { cityPlaceMapWithIds } from "../data/places";
import Roadmap from "../components/Roadmap";
import Navbar from "../components/Navbar";
import "../components/RoadmapPage.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';


const RoadmapPage = () => {
  const location = useLocation();
  const { selectedCity, selectedPlaces } = location.state || {};

  if (!selectedCity || !selectedPlaces) {
    return (
      <div className="p-6 text-red-600 text-lg">
        No data received. Please go back and select a city and place.
      </div>
    );
  }

  return (
    <div className="roadmap-page-body">
      <Navbar />
      <h1 className="page-title">
        Trip to <span className="selected-city">{selectedCity} </span>
      </h1>
      <h2 className="instruction">
        Customize by Dragging & Dropping the icons!
      </h2>
      <p>
      <Link to="/" className="go-home-link">
        Go to Home Page
      </Link>
    </p>
      <Roadmap
        selectedPlaces={selectedPlaces}
        placeData={cityPlaceMapWithIds[selectedCity]}
      />
    </div>

  );

};

export default RoadmapPage;
