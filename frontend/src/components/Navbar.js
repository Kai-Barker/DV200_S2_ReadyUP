import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../assets/images/ReadyUPLogo.png";
import "../css/Navbar.css";
import { Link } from "react-router-dom";
import icon from "../assets/images/towelahri.jpg";
import FriendsIcon from "../assets/images/FriendsIcon.png";

const Navbar = () => {
  return (
    <div className="navContainer py-2">
      <Container fluid>
        <Row className="align-items-center">
          {/* Logo */}
          
          <Col lg={2}>
            <Link to="/">
              <img src={Logo} style={{ maxWidth: "60%" }} className="cursor-target" />
            </Link>
          </Col>

          {/* Nav Links */}
          <Col lg={{span:5, offset:1}} className="d-flex justify-content-center gap-5">
            <Link className="nav-links cursor-target" to="/">Home</Link>
            <Link className="nav-links cursor-target" to="/categories">Browse Posts</Link>
            <Link className="nav-links cursor-target" to="/">My Posts</Link>
            <Link className="nav-links cursor-target" to="/">Categories</Link>
          </Col>

          {/* Icons */}
          <Col lg={{span:3,offset:1}} className="d-flex justify-content-end align-items-center gap-4 pe-4">
            <Link className="nav-links cursor-target" to="/">Help</Link>
            <Link to="/"><img src={FriendsIcon} className="cursor-target" style={{ height: "50px" }} /></Link>
            <Link to="/Login"><img src={icon} className="profileIcon cursor-target" style={{maxHeight:'80%'}}/></Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;
