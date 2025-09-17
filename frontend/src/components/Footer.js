import { Container, Row, Col } from "react-bootstrap";
import Logo from "../assets/images/ReadyUPLogo.png";
import { Link } from "react-router-dom";
import "../css/Footer.css";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Twitch,
  Discord,
} from "react-bootstrap-icons";

const Footer = () => {
  return (
    <div style={{ paddingTop: "5vh", backgroundColor: "#202D46", paddingBottom:'5vh' }}>
      <Container fluid>
        <Row className="px-4" style={{ paddingTop: "5vh" }}>
          <Col lg={{ span: 3, offset:0 }} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <Link to='/'>
            <img src={Logo} style={{ maxWidth: "100%" }} className="cursor-target"/>
          </Link>
          </Col>
          <Col
            lg={{ span: 3, offset:2 }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/" className="footer-links cursor-target">
              Home
            </Link>
            <Link to="/categories" className="footer-links cursor-target">
              Browse Posts
            </Link>
            <Link to="/" className="footer-links cursor-target">
              My Posts
            </Link>
            <Link to="/" className="footer-links cursor-target">
              My Profile
            </Link>
          </Col>
          <Col lg={{ span: 3, offset:1}} style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', gap:'3vh'}}>
            <Row>
              <Col xs={4} className="d-flex justify-content-center cursor-target">
                <Facebook size={50} color="#EDE4F1" />
              </Col>
              <Col xs={4} className="d-flex justify-content-center cursor-target">
                <Instagram size={50} color="#EDE4F1" />
              </Col>
              <Col xs={4} className="d-flex justify-content-center cursor-target">
                <Twitter size={50} color="#EDE4F1" />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs={4} className="d-flex justify-content-center cursor-target">
                <Youtube size={50} color="#EDE4F1" />
              </Col>
              <Col xs={4} className="d-flex justify-content-center cursor-target">
                <Twitch size={50} color="#EDE4F1" />
              </Col>
              <Col xs={4} className="d-flex justify-content-center cursor-target">
                <Discord size={50} color="#EDE4F1" />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      {/*  */}
    </div>
  );
};

export default Footer;
