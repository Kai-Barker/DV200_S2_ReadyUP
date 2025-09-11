import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../assets/images/ReadyUPLogo.png";
import "../css/Navbar.css";
import { NavLink } from "react-router-dom";
import icon from "../assets/images/towelahri.jpg";
import FriendsIcon from "../assets/images/FriendsIcon.png";

const Navbar = () => {
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
            <NavLink className="nav-links cursor-target" to="/admin">Admin</NavLink>
          </Col>

          {/* Icons */}
          <Col lg={{span:3,offset:1}} className="d-flex justify-content-end align-items-center gap-4 pe-4">
            <NavLink className="nav-links cursor-target" to="https://github.com/Kai-Barker/DV200_S2_ReadyUP.git">Help</NavLink>
            <NavLink to="/Login"><img src={FriendsIcon} className="cursor-target" style={{ height: "50px" }} /></NavLink>
            <NavLink to="/profile"><img src={icon} className="profileIcon cursor-target" style={{maxHeight:'80%'}}/></NavLink>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;
