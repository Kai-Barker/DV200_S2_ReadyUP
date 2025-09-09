import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SortByDropdown from "../components/SortByDropdown";
import SearchBar from "../components/SearchBar";
import TagFilterer from "../components/TagFilterer";

const BrowsePostsPage = () => {
  const title = useParams().gameTitle;
  return (
    <Container className="browse-posts-container p-5" fluid>
      <Row>
        <Col>
          <h1 style={{ fontSize: "2.8rem", color: "#EDE4F1" }}>{title}</h1>
        </Col>
      </Row>
      <Row className="gx-3 my-4">
        <Col md={5}>
          <TagFilterer />
        </Col>
        <Col md={3}>
          <SortByDropdown />
        </Col>
        <Col md={4}>
          <SearchBar />
        </Col>
      </Row>
    </Container>
  );
};

export default BrowsePostsPage;
