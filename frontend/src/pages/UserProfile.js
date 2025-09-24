import { Container, Row, Col } from "react-bootstrap";
import "../css/UserProfile.css";
import userPFP from "../assets/images/towelahri.jpg";
import EditProfileBTN from "../components/OutlineButton";
import OutlineButton from "../components/OutlineButtonLGFunction";
import Tabs from "../components/Tabs";
import { Discord, Steam } from "react-bootstrap-icons";
import api from "../api";
import { useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UpdateProfileInput from "../components/UpdateProfileInput";

const dummyUser = {
  profilePic: userPFP,
  userName: "Synergyy",
  userBio: `This user has no bio yet`,
  friends: "No friends added yet",
  platforms: ["Discord", "Steam"],
};

let tabsData = [
  {
    heading: "Summary",
    value: dummyUser.userBio,
  },
  {
    heading: "Friends",
    value: dummyUser.friends,
  },
];

const UserProfile = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editProfilePicture, setEditProfilePicture] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editCommunicationMethods, setEditCommunicationMethods] = useState(null);

  const getSocialIcon = (platform) => {
    switch (platform) {
      case "Discord":
        return <Discord className="cursor-target" style={{ marginRight: "3vw", fontSize: "10vh", color: "#73EEDC" }} />;
      case "Steam":
        return <Steam className="cursor-target" style={{ marginRight: "3vw", fontSize: "10vh", color: "#73EEDC" }} />;
      default:
        return <></>;
    }
  };
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
  };
  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    console.log(profileData);
    tabsData[0].value = profileData?.Bio || "No bio available.";
    tabsData[1].value = "No friends added yet";
    if (!profileData) {
      return;
    }
    setEditUsername(profileData.username);
    setEditBio(profileData.bio);
    setEditProfilePicture(profileData.profile_picture);
    setEditCommunicationMethods(profileData.communication_method);
  }, [profileData]);
  const handleSubmit = async () => {
    if (!editBio || !editUsername || !editProfilePicture) {
      console.log("Fill In All Fields");
      return;
    }
    const formData = new FormData();
    
    formData.append("pfp", editProfilePicture);
    formData.append("username", editUsername);
    formData.append("communication_method", editCommunicationMethods);
    formData.append("bio", editBio);
    console.log("FormData entries:", ...formData.entries());
    try {
      const response = await api.post('/user/update_profile', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Updated profile successfully", response.data);
      fetchProfileData();
      
    } catch (error) {
      console.error("Error updating profile" + error);
    }
    handleClose();
  };
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
              <img
                src={profileData?.profile_picture}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", border: "5px solid #EDE4F1" }}
              />
            </div>
            <div style={{ marginTop: "10vh" }}>
              <OutlineButton buttonLabel={"Edit Profile"} buttonFunction={handleClickOpen} />
            </div>
          </Col>
          <Col lg={{ span: 7, offset: 1 }} className="pt-2">
            {/* username and summary or friends */}
            <h1 className="profile-username-spacing profile-username">{profileData.username}</h1>
            {/* tab switcher */}
            <div style={{ height: "33vh" }}>
              <Tabs tabValues={tabsData} defaultTab="one" />
            </div>
            <div style={{ paddingTop: "5vh" }}>
              {profileData?.communication_method && profileData?.communication_method.split(",").map((value, index) => getSocialIcon(value))}
            </div>
          </Col>
        </Row>
      </Container>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="lg" PaperProps={{
    sx: {
      backgroundColor: '#171123',
      border: '2px solid #EDE4F1',
      borderRadius: '40px',
      color: '#EDE4F1',
    },
  }}>
        <DialogTitle sx={{ fontFamily: 'Audiowide, sans-serif', borderBottom: '1px solid #EDE4F1' }}>Edit Profile</DialogTitle>
        <DialogContent sx={{ paddingTop: '2rem !important' }}>
          <Container fluid>
            <Row>
              <Col>
                <UpdateProfileInput username={editUsername} bio={editBio} setUsername={setEditUsername} setBio={setEditBio} setPfp={setEditProfilePicture} />
              </Col>
              <Col>
                <div style={{ width: "100%", aspectRatio: "1 / 1" }}>
                  <img
                    src={editProfilePicture instanceof File ? URL.createObjectURL(editProfilePicture) : editProfilePicture || profileData?.profile_picture}
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", border: "5px solid #EDE4F1" }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid #EDE4F1' }}>
          <Button onClick={handleClose} className="cursor-target" sx={{ color: '#EDE4F1', fontFamily: 'Audiowide, sans-serif',fontSize:'20px', marginRight: '3vh' }}>Cancel</Button>
          <Button onClick={handleSubmit} className="cursor-target" sx={{ color: '#73EEDC', fontFamily: 'Audiowide, sans-serif', fontSize:'20px', marginRight: '4vh' }}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;
