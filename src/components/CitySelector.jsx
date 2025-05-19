import React from "react";
import "./CitySelector.css"

export default function CitySelector({ cities = [], selectedCity, onCityChange }) {
  return (

    <div className="city-selector">
      <label className="city-label">Select a City</label>
      <div className="city-buttons">
        {cities.map((city) => (
          <button
            key={city}
            className={`city-button ${selectedCity === city ? 'active' : ''}`}
            onClick={() => onCityChange(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
);
}
