
// import React, { useState } from "react";
// import { cities, cityPlaceMapWithIds } from "../data/places";
// import CitySelector from "../components/CitySelector";
// import PlaceSelector from "../components/PlaceSelector"; // <-- You need to create this
// import { useNavigate } from "react-router-dom";
// import "../components/SelectionPage.css";
// import logoPng from "../assets/diceimg.png"; // adjust the path as needed


// const SelectionPage = () => {
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedPlaces, setSelectedPlaces] = useState([]);
//   const [isShrinking, setIsShrinking] = useState(false);

//   const navigate = useNavigate();

//   const handleCityChange = (city) => {
//     setSelectedCity(city);
//     setSelectedPlaces([]); // Clear previous places
//   };

//   const handlePlaceToggle = (placeName) => {
//     setSelectedPlaces((prev) =>
//       prev.includes(placeName)
//         ? prev.filter((p) => p !== placeName)
//         : [...prev, placeName].slice(0, 3)
//     );
//   };

//   const handleGenerateClick = () => {
//     setIsShrinking(true); // Start shrink animation

//   setTimeout(() => {
//     navigate("/loading", {
//       state: { selectedCity, selectedPlaces },
//     });
//   }, 2000);
//     navigate("/loading", {
//       state: { selectedCity, selectedPlaces },
//     });
//   };
  

//   return (
//   <div className="planner-wrapper">
//     <div className="logo-container">
//       <img src={logoPng} alt="App Logo" className="logo-img" />
//     </div>


//     <div className="planner-container">
//       <h1 className="planner-title">Plan Your Trip</h1>

//       <CitySelector
//         cities={cities}
//         selectedCity={selectedCity}
//         onCityChange={handleCityChange}
//       />

//       {selectedCity && (
//         <PlaceSelector
//           places={cityPlaceMapWithIds[selectedCity]}
//           selectedPlaces={selectedPlaces}
//           onTogglePlace={handlePlaceToggle}
//         />
//       )}

//       <button
//         className={`generate-button ${
//           selectedPlaces.length === 3 ? "enabled" : "disabled"
//         }`}
//         disabled={selectedPlaces.length !== 3}
//         onClick={handleGenerateClick}
//       >
//         Generate Roadmap
//       </button>
//     </div>
//   </div>
// );
// };

// export default SelectionPage;

import React, { useState } from "react";
import { cities, cityPlaceMapWithIds } from "../data/places";
import CitySelector from "../components/CitySelector";
import PlaceSelector from "../components/PlaceSelector";
import { useNavigate } from "react-router-dom";
import "../components/SelectionPage.css";
import logoPng from "../assets/cprbg.png";
import Lottie from "lottie-react";
import bubbleAnimation from "../animations/Bubble.json";


const SelectionPage = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [isShrinking, setIsShrinking] = useState(false);
  const navigate = useNavigate();

  const handleCityChange = (city) => {
    // Start logo shrinking and expand wrapper simultaneously
    setIsShrinking(true);

    // Update city and clear places immediately
    setSelectedCity(city);
    setSelectedPlaces([]);
  };

  const handlePlaceToggle = (placeName) => {
    setSelectedPlaces((prev) =>
      prev.includes(placeName)
        ? prev.filter((p) => p !== placeName)
        : [...prev, placeName].slice(0, 3)
    );
  };

  const handleGenerateClick = () => {
    navigate("/loading", {
      state: { selectedCity, selectedPlaces },
    });
  };

  return (
    <div className="Bubble-container">

      <div className={`planner-wrapper ${isShrinking ? "expanded" : ""}`}>
      <div className={`logo-container ${isShrinking ? "shrunk" : ""}`}>
        <img src={logoPng} alt="App Logo" className="logo-img" />
      </div>

      <div className="planner-container">
        <h1 className="planner-title">Plan Your Trip</h1>

        <CitySelector
          cities={cities}
          selectedCity={selectedCity}
          onCityChange={handleCityChange}
        />

        {selectedCity && (
          <PlaceSelector
            places={cityPlaceMapWithIds[selectedCity]}
            selectedPlaces={selectedPlaces}
            onTogglePlace={handlePlaceToggle}
          />
        )}

        <button
          className={`generate-button ${
            selectedPlaces.length === 3 ? "enabled" : "disabled"
          }`}
          disabled={selectedPlaces.length !== 3}
          onClick={handleGenerateClick}
        >
          Generate Roadmap
        </button>
      </div>
    </div>
    </div>
    
  );
};

export default SelectionPage;

