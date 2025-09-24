import { Container, Row, Col } from "react-bootstrap";
import "../css/UserProfile.css";
import userPFP from "../assets/images/towelahri.jpg";
import EditProfileBTN from "../components/OutlineButton";
import OutlineButton from "../components/OutlineButtonLG";
import Tabs from "../components/Tabs";
import { Discord, Steam } from 'react-bootstrap-icons';
import api from "../api";
import { useEffect } from "react";
import { useState } from "react";

const dummyUser = {
  profilePic: userPFP,
  userName: "Synergyy",
  userBio: `This user has no bio yet`,
    friends: "No friends added yet",
    platforms: [
        "Discord","Steam"
    ]
};

let tabsData = [
    {
        heading:'Summary',
        value:dummyUser.userBio,
    },
    {
        heading:'Friends',
        value: dummyUser.friends,
    }
]

const UserProfile = () => {

  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);



  const getSocialIcon = (platform) => {
  switch (platform) {
    case 'Discord':
      return <Discord className='cursor-target' style={{ marginRight: '3vw', fontSize:'10vh', color: '#73EEDC' }} />;
    case 'Steam':
      return <Steam className='cursor-target' style={{ marginRight: '3vw', fontSize:'10vh', color: '#73EEDC' }} />;
    default:
      return <Discord style={{ marginRight: '10px' }} />;
  }
};
  useEffect(()=>{
    const fetchProfileData = async () => {
      try {
        const response = await api.get("/user/profile");
        setProfileData(response.data.data);
        // console.log(response.data);
        
        // console.log(profileData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    fetchProfileData();
  }, [])

  useEffect(() => {
    console.log(profileData);
    tabsData[0].value = profileData?.bio || "No bio available.";
    tabsData[1].value = "No friends added yet"
  }, [profileData]);
  if (isLoading) {
    return <p>Loading profile...</p>;
  }
  if (!profileData) {
    return <p>Could not load profile.</p>;
  }
  return (
    <div style={{ height: "80vh" }}>
      <Container fluid className="px-5 py-5">
        <Row>
          <Col lg={3}>
            {/* profile and edit profile btn */}
            <div style={{ width: "100%", aspectRatio: "1 / 1" }}>
              <img src={profileData?.profile_picture} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", border: "5px solid #EDE4F1" }} />
            </div>
            <div style={{marginTop:'10vh'}}>
              <OutlineButton buttonLabel={"Edit Profile"} buttonLink={"/"} />
            </div>
          </Col>
          <Col lg={{span:7, offset:1}} className="pt-2">{/* username and summary or friends */}
            <h1 className="profile-username-spacing profile-username">{profileData.username}</h1>
            {/* tab switcher */}
            <div style={{height:'33vh'}}>
                <Tabs tabValues={tabsData} defaultTab="one"/>
            </div>
            <div style={{paddingTop:'5vh'}}>
            {profileData?.communication_method && profileData?.communication_method.split(",").map((value, index) => (
                getSocialIcon(value)
            ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserProfile;
