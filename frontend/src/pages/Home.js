import GameCatCard from "../components/GameCatCard";
import dummyImg from "../assets/images/FN PlaceHolder.png";
import { Container, Row, Col } from "react-bootstrap";
import GameInfoCard from "../components/HomeInfoCard";

const dummyData = {
  image: dummyImg,
  title: "Fortnite",
  numPosts: 73,
};

const Home = () => {
  return (
    <div>
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
        <Row className="gx-5">
          <Col md={3}>
            <GameInfoCard title={"Latest News"} description="Stay updated with the latest news in the gaming world." />
          </Col>
          <Col md={3}>
            <GameInfoCard title={"Latest News"} description="Stay updated with the latest news in the gaming world." />
          </Col>
          <Col md={3}>
            <GameInfoCard title={"Latest News"} description="Stay updated with the latest news in the gaming world." />
          </Col>
          <Col md={3}>
            <GameInfoCard title={"Latest News"} description="Stay updated with the latest news in the gaming world." />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
