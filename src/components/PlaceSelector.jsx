import React from "react";
import "./PlaceSelector.css";

export default function PlaceSelector({ places = [], selectedPlaces, onTogglePlace }) {
  return (
    <div className="place-selector">
      <h2 className="place-heading">Select up to 3 Places</h2>
      <div className="place-list">
        {places.map((place) => (
          <div key={place.name} className="place-item">
            <input
              type="checkbox"
              id={place.name}
              checked={selectedPlaces.includes(place.name)}
              onChange={() => onTogglePlace(place.name)}
              disabled={
                !selectedPlaces.includes(place.name) &&
                selectedPlaces.length >= 3
              }
            />
            <label htmlFor={place.name}>
              <strong>{place.name}</strong> – {place.description}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
