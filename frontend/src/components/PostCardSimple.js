import { Container, Row, Col } from "react-bootstrap";
import "../css/PostCard.css";

const PostCardSimple = ({ title, description, onCardClick = (() => {})}) => {
  return (
    <Container className="cardBorder cursor-target" style={{color:"#EDE4F1"}} onClick={onCardClick}>
      <Row>
        <Col lg={{span:11, offset:1}} className="my-4 post-card-text">
          <h2 className="my-4">{title}</h2>
          <p style={{ fontSize: "20px" }}>{description}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default PostCardSimple;
