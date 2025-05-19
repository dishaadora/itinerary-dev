// Logo.js
import React from "react";
import logoImg from "./logo.png"; // Make sure this path is correct

export default function Logo() {
  return (
    <img
      src={logoImg}
      alt="App Logo"
      className="app-logo"
    />
  );
}
