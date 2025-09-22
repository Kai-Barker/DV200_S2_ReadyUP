import "../css/CategoriesPage.css";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import SortByDropdown from "../components/SortByDropdown";
import GameCatCard from "../components/GameCatCard";
import dummyImg from "../assets/images/FN PlaceHolder.png";
import PaginationControls from "../components/PaginationControls";
import { useState, useEffect } from "react";
import axios from "axios";

// const categories = [
//   {
//     image: dummyImg,
//     title: "Fortnite",
//     numPosts: 73,
//   },
//   {
//     image: dummyImg,
//     title: "League of Legends",
//     numPosts: 120,
//   },
//   {
//     image: dummyImg,
//     title: "Valorant",
//     numPosts: 95,
//   },
//   {
//     image: dummyImg,
//     title: "Minecraft",
//     numPosts: 250,
//   },
//   {
//     image: dummyImg,
//     title: "Apex Legends",
//     numPosts: 80,
//   },
//   {
//     image: dummyImg,
//     title: "CS:GO",
//     numPosts: 150,
//   },
//   {
//     image: dummyImg,
//     title: "Overwatch",
//     numPosts: 60,
//   },
//   {
//     image: dummyImg,
//     title: "Rocket League",
//     numPosts: 45,
//   },
//   {
//     image: dummyImg,
//     title: "Paladins",
//     numPosts: 45,
//   },
// ];

const CategoriesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const categoriesPerPage = 8;

  const totalPages = categories ? Math.ceil(categories.length / categoriesPerPage) : 0;

  useEffect(() => {
    setPageIndex((currentPage - 1) * categoriesPerPage);
  }, [currentPage]);

  useEffect(() => {
    const fetchCategories = async() => {
      try {
        const response = await axios.get('http://localhost:5000/api/lfg');
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

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Fetch new data based on newPage
    }
  }
  const currentCategories = categories ? categories.slice(pageIndex, pageIndex + categoriesPerPage) : [];
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
          {currentCategories.map((game, index) => (
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
        <Row className="my-4" style={{ justifyContent: "center" }}>
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </Row>
      </Container>
    </div>
  );
};

export default CategoriesPage;
