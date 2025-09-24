import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../assets/images/ReadyUPLogo.png";
import "../css/Navbar.css";
import { NavLink } from "react-router-dom";
import icon from "../assets/images/towelahri.jpg";
import FriendsIcon from "../assets/images/FriendsIcon.png";
import useAuth from "../customHooks/auth";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import OutlineButton from "./OutlineButton";
import OutlineButtonFunction from "./OutlineButtonFunction";
import api from "../api";



const Navbar = () => {
 const {user, isLoggedIn} = useAuth();
 const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
  forceRefreshPage();
 }
 useEffect( () => {
  // console.log(user);
  // console.log(isLoggedIn);
  
 }, [user, isLoggedIn]);
 const forceRefreshPage = () => {
    window.location.reload();
  };
 useEffect(() => {
  if (isLoggedIn && user) {
    const fetchProfilePic = async () => {
      try {
        const response = await api.get("/user/profile");
        setProfilePic(response.data.data.profile_picture);
      } catch (error) {
        console.error("unable to fetch profile picture");
      }
    };
    fetchProfilePic();
  }
 }, [isLoggedIn, user]);
  return (
    <div className="navContainer py-2">
      <Container fluid>
        <Row className="align-items-center">
          {/* Logo */}
          
          <Col lg={2}>
            <NavLink to="/">
              <img src={Logo} style={{ maxWidth: "60%" }} className="cursor-target" />
            </NavLink>
          </Col>

          {/* Nav Links */}
          <Col lg={{span:5, offset:1}} className="d-flex justify-content-center gap-5">
            <NavLink className="nav-links cursor-target" to="/">Home</NavLink>
            <NavLink className="nav-links cursor-target" to="/categories">Browse Posts</NavLink>
            <NavLink className="nav-links cursor-target" to="/myposts">My Posts</NavLink>
            {isLoggedIn && user?.role === 'admin' && (
              <NavLink className="nav-links cursor-target" to="/admin">Admin</NavLink>
            )}
          </Col>

          {/* Icons */}
          <Col lg={{span:3,offset:1}} className="d-flex justify-content-end align-items-center gap-4 pe-4">
            <NavLink className="nav-links cursor-target" to="https://github.com/Kai-Barker/DV200_S2_ReadyUP.git">Help</NavLink>
            {isLoggedIn ? <OutlineButtonFunction buttonLabel={"Logout"} buttonFunction={handleLogout} /> : null}
            {!isLoggedIn ? <><OutlineButton buttonLabel={"Login"} buttonLink={"/login"} /> <div style={{width:'50%'}}></div></> : (
              <>
                <img src={FriendsIcon} onClick={handleLogout} className="cursor-target" style={{ height: "50px" }} />
                <NavLink to="/profile"><img src={profilePic} className="profileIcon cursor-target" style={{maxHeight:'80%'}}/></NavLink>
              </>

)}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;
