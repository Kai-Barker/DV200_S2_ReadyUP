import { useState, useEffect } from "react";
import useAuth from "../customHooks/auth";
import api from "../api";
import "../css/UsernameAndPfpCard.css";
import { Link } from "react-router-dom";
import AddIcon from '../assets/images/AddIcon.svg';
import RemoveIcon from '../assets/images/RemoveIcon.svg';

const UsernameAndPFPCard = ({ username, profilePicture, userID, isAdd = false, isRemove = false, onAddFunction = () => {}, onRemoveFunction = () => {} }) => {
  useEffect(() => {
    console.log(username);
  }, []);
  return (
    <div className="username-card-wrapper">
      <Link to={`/profile/${userID}`} className="card-link">
        <div className="card-container cursor-target">
          <div className="pfp-container">
            <img src={profilePicture} alt="Profile" className="pfp-image" />
          </div>
          <div className="separator"></div>
          <div className="username">{username}</div>
        </div>
      </Link>
      {isAdd &&
        <div className="action-button cursor-target" onClick={() => onAddFunction(userID)}>
        <img src={AddIcon} alt="Add" style={{ width: '60%', height: '60%' }} />
        </div>
      }
      {isRemove &&
        <div className="action-button cursor-target" onClick={() => onRemoveFunction(userID)}>
        <img src={RemoveIcon} alt="Remove" style={{ width: '60%', height: '60%' }} />
        </div>
      }
    </div>
  );
};

export default UsernameAndPFPCard;
