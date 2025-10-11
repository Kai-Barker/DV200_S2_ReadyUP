import { useState, useEffect } from "react";
import useAuth from "../customHooks/auth";
import api from "../api";
import "../css/UsernameAndPfpCard.css";

const UsernameAndPFPCard = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/user/profile");
        setProfileData(response.data.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setProfileData({
          username: "Synergyy",
          profile_picture: "https://i.imgur.com/your-image-url.png",
        });
      }
    };

    fetchProfileData();
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-container">

      <div className="pfp-container">
        <img
          src={profileData?.profile_picture}
          alt="Profile"
          className="pfp-image"
        />
      </div>

      <div className="separator"></div>

      <div className="username">
        {profileData?.username}
      </div>
    </div>
  );
};

export default UsernameAndPFPCard;