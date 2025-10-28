import { Col, Container, Row } from "react-bootstrap";
import "../css/GameCatCard.css";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";

const GameCatCard = ({ image, title, numPosts, categoryID }) => {
  return (
    <div>
      <Container>
        <Row>
          <Col className="game-cat-card" style={{ padding: "0" }}>
            <img src={image} alt={title} style={{ margin: "none", maxHeight: "50vh", height: "50vh", objectFit: "cover" }} />
            <h5 className="game-cat-card-title">{title}</h5>
            <p className="game-cat-card-posts">{numPosts || "0"} Posts looking for a group</p>
            <Link
              to={`/browse-posts/${title}`}
              onClick={() => {
                ReactGA.event({
                  action: "selected_category",
                  params: {
                    post_category: title,
                  },
                });
              }}
              style={{ textDecoration: "none" }}
            >
              <h6 className="view-now  cursor-target">
                <span className="view-text">View Now</span>
                <span className="view-arrow">{">"}</span>
              </h6>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GameCatCard;
