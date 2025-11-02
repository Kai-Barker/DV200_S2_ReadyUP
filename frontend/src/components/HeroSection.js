import React from "react";
import '../css/HeroSection.css';
import { Link } from "react-router-dom";
import OutlineButton from "./OutlineButton";

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-heading-one"><span style={{color:'#73EEDC'}}>Find</span> Your Next Squad Now</h1>
        <h2 className="hero-heading-two">ReadyUP is your looking for group hub</h2>
        <Link className="hero-link" to="/categories"> 
        <button className="hero-button cursor-target">
          <span>Browse Posts</span>
        </button>
        <div className="hero-button-mobile">
          <OutlineButton buttonLink={"/categories"} buttonLabel={"Browse Posts"} />
        </div>
        </Link>
      </div>
    </div>
  );
}

export default HeroSection;
