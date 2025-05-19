import React, { useState } from "react";
import CitySelector from "./CitySelector";
import { cities, cityPlaceMap } from "../data/places.js";
import TripCountdown from "./TripCountdown";
import Navbar from "./Navbar"; // Adjust path if needed
export default function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [showCountdown, setShowCountdown] = useState(false);

  const handleCityChange = (city) => {
    setSelectedCity(city);
    setSelectedPlaces([]);
  };

  const handlePlaceToggle = (placeName) => {
    setSelectedPlaces((prev) =>
      prev.includes(placeName)
        ? prev.filter((name) => name !== placeName)
        : [...prev, placeName]
    );
  };

  const placesToShow =
    selectedCity && cityPlaceMap[selectedCity]
      ? cityPlaceMap[selectedCity].filter((place) =>
          selectedPlaces.includes(place.name)
        )
      : [];

  const handleStartTrip = () => setShowCountdown(true);

  return (
    <div style={{ padding: 20 }}>
      <Navbar onSelectCity={() => setSelectedCity("")} /> {/* Navbar at top */}

      <h1>Travel Planner</h1>

      {!selectedCity ? (
        <CitySelector
          cities={cities}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
        />
      ) : (
        <>
          <h2>Choose places in {selectedCity} to visit:</h2>
          <div>
            {cityPlaceMap[selectedCity].map((place) => (
              <label key={place.name} style={{ display: "block", margin: "5px 0" }}>
                <input
                  type="checkbox"
                  checked={selectedPlaces.includes(place.name)}
                  onChange={() => handlePlaceToggle(place.name)}
                />
                {place.name} ({place.type})
              </label>
            ))}
          </div>
        </>
      )}

      {placesToShow.length > 0 && (
        <>
          <h2>Your Travel Roadmap:</h2>
          <ul>
            {placesToShow.map((place) => (
              <li
                key={place.name}
                title={`${place.description}\nAccessories: ${place.accessories.join(", ")}`}
                style={{ marginBottom: 10, cursor: "help" }}
              >
                <strong>{place.name}</strong> - {place.type}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

