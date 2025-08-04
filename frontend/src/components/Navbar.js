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
    // <Container>
    //   <Row>
    //     <Col>1 of 2</Col>
    //     <Col>2 of 2</Col>
    //   </Row>
    //   <Row>
    //     <Col>1 of 3</Col>
    //     <Col>2 of 3</Col>
    //     <Col>3 of 3</Col>
    //   </Row>
    // </Container>
    <div className="navContainer">
      <Container fluid style={{ marginLeft: "1vw" }}>
        <Row>
          <Col lg={{ span: 2, offset: 0 }}>
            <img src={Logo} style={{ maxWidth: "60%", marginBottom:'1vh',marginTop:'1vh' }} />
          </Col>
          <Col
            lg={{ span: "auto", offset: 1 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <Link className="nav-links" to="/">
                Home
              </Link>
            </div>
            <div style={{marginLeft:'3vw'}}>
              <Link className="nav-links" to="/">
                Browse Posts
              </Link>
            </div>
            <div style={{marginLeft:'3vw'}}>
              <Link className="nav-links" to="/">
                My Posts
              </Link>
            </div>
            <div style={{marginLeft:'3vw'}}>
              <Link className="nav-links" to="/">
                Categories
              </Link>
            </div>
          </Col>
          <Col
            lg={{ span: "3", offset: 1 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <Link className="nav-links" to="/">
                Help
              </Link>
            </div>
            <div>
              <Link to="/">
                <img src={FriendsIcon} style={{ maxWidth: "40%", marginLeft:'3vw' }} />
              </Link>
            </div>
            <div>
              <Link to="/">
                <img src={icon} style={{ marginLeft:'1vw' }} className="profileIcon"/>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Navbar;
