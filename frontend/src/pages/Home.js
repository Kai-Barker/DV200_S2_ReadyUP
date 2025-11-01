import GameCatCard from "../components/GameCatCard";
import dummyImg from "../assets/images/FN PlaceHolder.png";
import { Container, Row, Col } from "react-bootstrap";
import GameInfoCard from "../components/HomeInfoCard";
import GameInfoCardSpecial from "../components/HomeInfoCardSpecial";
import HeroSection from "../components/HeroSection";
import "../css/Home.css";
import api from "../api";
import {useState, useEffect} from "react";
import useSeoPageInfo from "../customHooks/useSeoPageInfo";


const dummyData = {
  image: dummyImg,
  title: "Fortnite",
  numPosts: 73,
};

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useSeoPageInfo({
    title: "ReadyUP | Find Your Next Gaming Teammates (LFG)",
    description: "Stop playing solo and find your group. ReadyUP helps you find teammates and LFG groups for your favorite games so randoms will stop throwing. Browse posts for Valorant, Apex Legends, & more and build your squad"
});

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const response = await api.get('/lfg/top_posts');
        const data = await response.data;
        setCategories(data);
        console.log(data);
        
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching categories');
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />
      <h1 className="home-section-heading">Popular Games</h1>
      <Container fluid className="px-5">
        <Row className="gx-5">
          {categories.map((game, index) => (
            <Col key={index} md={3}>
              <GameCatCard
                image={game.category_picture}
                title={game.title}
                numPosts={game.num_posts}
                categoryID={game.category_id}
              />
            </Col>
          ))}
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
