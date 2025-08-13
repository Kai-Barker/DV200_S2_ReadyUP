import { Col, Container, Row } from "react-bootstrap";
import "../css/GameCatCard.css";

const GameCatCard = ({ image, title, numPosts }) => {
  return (
    <div>
      <Container >
        <Row>
          <Col className="game-cat-card"style={{padding: "0"}}>
            <img src={image} alt={title} style={{margin: "none"}}/>
            <h5 className="game-cat-card-title">{title}</h5>
            <p className="game-cat-card-posts">{numPosts} Posts looking for a group</p>
            <h6 className="view-now  cursor-target">
              <span className="view-text">View Now</span>
              <span className="view-arrow">{">"}</span>
            </h6>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GameCatCard;
