import { Col, Container, Row } from "react-bootstrap";
import "../css/GameCatCard.css";
import { Link } from "react-router-dom";
import OutlineButton from "./OutlineButtonFunction";

const CategoryAdmin = ({ image, title, onDelete }) => {
  return (
    <div>
      <Container>
        <Row>
          <Col className="game-cat-card"style={{padding: "0"}}>
            <img src={image} alt={title} style={{margin: "none"}}/>
            <h5 className="game-cat-card-title">{title}</h5>
            <OutlineButton buttonLabel={"Delete Category"} buttonFunction={onDelete}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryAdmin;
