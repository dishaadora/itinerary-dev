import React, { useState, useEffect } from "react";

export default function TripCountdown({ onClose }) {
  const [days, setDays] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);

  // Calculate countdown end time when days are set
  useEffect(() => {
    if (!timeLeft && days > 0) {
      const endTime = Date.now() + days * 24 * 60 * 60 * 1000;
      setTimeLeft(endTime);
    }

    const interval = setInterval(() => {
      if (!timeLeft) return;

      const now = Date.now();
      const diff = timeLeft - now;

      if (diff <= 0) {
        setTimeLeft(null);
        clearInterval(interval);
      } else {
        setTimeLeft(timeLeft); // trigger update
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, days]);

  // Calculate remaining time display
  const getRemainingTime = () => {
    if (!timeLeft) return null;
    const diff = timeLeft - Date.now();
    if (diff <= 0) return null;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    return `${d}d ${h}h ${m}m ${s}s`;
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (days > 0) {
      const endTime = Date.now() + days * 24 * 60 * 60 * 1000;
      setTimeLeft(endTime);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      {!timeLeft ? (
        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            padding: 20,
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <h3>Enter number of days for your trip</h3>
          <input
            type="number"
            min="1"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
            style={{ padding: 8, fontSize: 16, width: "80%" }}
          />
          <br />
          <button
            type="submit"
            style={{
              marginTop: 10,
              padding: "8px 16px",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Start Countdown
          </button>
        </form>
      ) : (
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 8,
            textAlign: "center",
            minWidth: 250,
          }}
        >
          <h3>Trip Countdown</h3>
          <p style={{ fontSize: "1.5em", margin: "20px 0" }}>{getRemainingTime()}</p>
          <button
            onClick={onClose}
            style={{
              padding: "8px 16px",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
