import { useState, useEffect } from "react";
import useAuth from "../customHooks/auth";
import api from "../api";
import "../css/UsernameAndPfpCard.css";
import { Link } from "react-router-dom";

const UsernameAndPFPCard = ({ username, profilePicture, userID }) => {
  useEffect(() => {
    console.log(username);
  }, []);
  return (
    <Link to={`/profile/${userID}`}>
      <div className="card-container cursor-target">
        <div className="pfp-container">
          <img src={profilePicture} alt="Profile" className="pfp-image" />
        </div>

        <div className="separator"></div>
        <div className="username">Synergyy</div>
      </div>
    </Link>
  );
};

export default UsernameAndPFPCard;
