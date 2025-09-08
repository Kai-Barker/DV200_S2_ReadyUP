import "../css/CategoriesPage.css";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import SortByDropdown from "../components/SortByDropdown";
import GameCatCard from "../components/GameCatCard";
import dummyImg from "../assets/images/FN PlaceHolder.png";

const dummyData = [
  {
    image: dummyImg,
    title: "Fortnite",
    numPosts: 73,
  },
  {
    image: dummyImg,
    title: "League of Legends",
    numPosts: 120,
  },
  {
    image: dummyImg,
    title: "Valorant",
    numPosts: 95,
  },
  {
    image: dummyImg,
    title: "Minecraft",
    numPosts: 250,
  },
  {
    image: dummyImg,
    title: "Apex Legends",
    numPosts: 80,
  },
  {
    image: dummyImg,
    title: "CS:GO",
    numPosts: 150,
  },
  {
    image: dummyImg,
    title: "Overwatch",
    numPosts: 60,
  },
  {
    image: dummyImg,
    title: "Rocket League",
    numPosts: 45,
  },
];

const CategoriesPage = () => {
  return (
    <div className="categories-page">
      <Container fluid className="px-5 py-4">
        <Row>
          <Col md={6} style={{ textAlign: "left" }}>
            <h1 className="categories-page-heading">Select A Game</h1>
          </Col>
          <Col md={3}>
            <SortByDropdown />
          </Col>
          <Col md={3}>
            <SearchBar />
          </Col>
        </Row>
        <Row className="gx-5 gy-5 my-1">
          {dummyData.map((game, index) => (
            <Col key={index} md={3}>
              <GameCatCard
                image={game.image}
                title={game.title}
                numPosts={game.numPosts}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CategoriesPage;
