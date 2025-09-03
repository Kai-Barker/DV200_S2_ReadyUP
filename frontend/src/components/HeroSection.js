import React from "react";
import '../css/HeroSection.css';

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-heading-one">Find Your Next Squad Now</h1>
        <h2 className="hero-heading-two">ReadyUP is your looking for group hub</h2>
        <button className="hero-button">
          <span>Browse Posts</span>
        </button>
      </div>
    </div>
  );
}

export default HeroSection;
