import {Container, Row, Col} from "react-bootstrap";
import "../css/HomeInfoCard.css";

const HomeInfoCard = ({title, description}) => {
    return (
        <Container className="home-info-card">
            <Row>
                <Col>
                    <h2 className="home-info-card-title">{title}</h2>
                    <p className="home-info-card-description">{description}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeInfoCard;