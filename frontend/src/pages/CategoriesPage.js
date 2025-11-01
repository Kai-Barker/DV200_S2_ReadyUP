import "../css/CategoriesPage.css";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import SortByDropdown from "../components/SortByDropdown";
import GameCatCard from "../components/GameCatCard";
import dummyImg from "../assets/images/FN PlaceHolder.png";
import PaginationControls from "../components/PaginationControls";
import { useState, useEffect } from "react";
import api from "../api";
import useDebounce from "../customHooks/searchDebounce";
import useSeoPageInfo from "../customHooks/useSeoPageInfo";

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

const sortOptions = [
  "Most Posts",
  "Fewest Posts",
  "Alphabetical (A-Z)",
  "Alphabetical (Z-A)",
];


const CategoriesPage = () => {

  useSeoPageInfo({
    title: "Browse All Game Categories | ReadyUP",
    description: "Find LFG groups for games like Fortnite, Valorant, League of Legends, and more. See all available LFG categories on ReadyUP."
});

  const [currentPage, setCurrentPage] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Most Posts");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const categoriesPerPage = 8;

  // const totalPages = categories ? Math.ceil(categories.length / categoriesPerPage) : 0;

  // useEffect(() => {
  //   setPageIndex((currentPage - 1) * categoriesPerPage);
  // }, [currentPage]);

  // { label: "Most Posts", value: "num_posts_desc" },
  // { label: "Fewest Posts", value: "num_posts_asc" },
  // { label: "Alphabetical (A-Z)", value: "title_asc" },
  // { label: "Alphabetical (Z-A)", value: "title_desc" },

  const onSortChange = (sortState) => {
    
  }

  useEffect(() => {
    const fetchCategories = async() => {
      setIsLoading(true);
      try {
        let sortValue = ''
        switch (sortBy) {
      case "Most Posts":
        sortValue = "num_posts_desc";
        break;
      case "Fewest Posts":
        sortValue = "num_posts_asc";
        break;
      case "Alphabetical (A-Z)":
        sortValue = "title_asc";
        break;
      case "Alphabetical (Z-A)":
        sortValue = "title_desc";
        break;
      default:
        sortValue = "num_posts_desc";
        break;
    }
        const params = new URLSearchParams();
        params.append('page', currentPage);
        params.append('limit', categoriesPerPage);
        params.append('sort', sortValue);
        if (debouncedSearchTerm) {
          params.append('search', debouncedSearchTerm);
        }
        const response = await api.get(`/lfg?${params.toString()}`);
        const data = await response.data;
        setCategories(data.data);
        setTotalPages(Math.ceil(data.totalItems / categoriesPerPage));
        console.log(data);
        
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching categories');
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, [debouncedSearchTerm, sortBy, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      // Fetch new data based on newPage
    }
  }
  // const currentCategories = categories ? categories.slice(pageIndex, pageIndex + categoriesPerPage) : [];
  return (
    <div className="categories-page">
      <Container fluid className="px-5 py-4">
        <Row>
          <Col md={6} style={{ textAlign: "left" }}>
            <h1 className="categories-page-heading">Select A Game</h1>
          </Col>
          <Col md={3}>
            <SortByDropdown label={"Sort By"} options={sortOptions} setFunction={(newValue) => {
              setSortBy(newValue);
              setCurrentPage(1); // Reset to page 1 on sort to avoid going over the limit of available categories when filtering
            }} value={sortBy} />
          </Col>
          <Col md={3}>
            <SearchBar searchValue={searchTerm} onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search for same reason as dropdown
            }}/>
          </Col>
        </Row>
        <Row className="gx-5 gy-5 my-1">
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
        <Row className="my-4" style={{ justifyContent: "center" }}>
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </Row>
      </Container>
    </div>
  );
};

export default CategoriesPage;
