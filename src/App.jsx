import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SelectionPage from "./pages/SelectionPage";
import LoadingScreen from "./components/LoadingScreen"; // adjust the path if needed
import RoadmapPage from "./pages/RoadmapPage"; // Ensure this import is there
function App() {
  return (
    <Router basename="/itinerary-dev">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/planner" element={<SelectionPage />} />
        <Route path="/loading" element={<LoadingScreen />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
      </Routes>
    </Router>
  );
}

export default App;
