import GameCatCard from "../components/GameCatCard";
import dummyImg from "../assets/images/FN PlaceHolder.png";
import { Container, Row, Col } from "react-bootstrap";
import GameInfoCard from "../components/HomeInfoCard";
import GameInfoCardSpecial from "../components/HomeInfoCardSpecial";
import HeroSection from "../components/HeroSection";
import "../css/Home.css";

const dummyData = {
  image: dummyImg,
  title: "Fortnite",
  numPosts: 73,
};

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      <h1 className="home-section-heading">Popular Games</h1>
      <Container fluid className="px-5">
        <Row className="gx-5">
          <Col md={3}>
            <GameCatCard
              image={dummyData.image}
              title={dummyData.title}
              numPosts={dummyData.numPosts}
            />
          </Col>
          <Col md={3}>
            <GameCatCard
              image={dummyData.image}
              title={dummyData.title}
              numPosts={dummyData.numPosts}
            />
          </Col>
          <Col md={3}>
            <GameCatCard
              image={dummyData.image}
              title={dummyData.title}
              numPosts={dummyData.numPosts}
            />
          </Col>
          <Col md={3}>
            <GameCatCard
              image={dummyData.image}
              title={dummyData.title}
              numPosts={dummyData.numPosts}
            />
          </Col>
        </Row>
      </Container>
      <h1 className="home-section-heading">How it works</h1>
      <Container fluid className="px-5 mb-5">
        <Row className="gx-5 align-items-stretch">
          <Col md={3}>
            <GameInfoCard title={"Select The Game You’d Like To Play"} description="Browse Posts > Click a Banner" />
          </Col>
          <Col md={3}>
            <GameInfoCard title={"Join A Group Or Make Your Own"} description="Select A Group Or Call For Others" />
          </Col>
          <Col md={3}>
            <GameInfoCard title={"Connect On Your Fav Platform"} description="Specify This In Your Profile" />
          </Col>
          <Col md={3}>
            <GameInfoCardSpecial title={"Let’s Game"} description="Good Luck, Have Fun" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
