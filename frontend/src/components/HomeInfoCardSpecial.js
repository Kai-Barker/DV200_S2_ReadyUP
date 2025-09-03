import {Container, Row, Col} from "react-bootstrap";
import "../css/HomeInfoCardSpecial.css";

const HomeInfoCard = ({title, description}) => {
    return (
        <Container className="home-info-card">
            <Row>
                <Col>
                    <h1 className="home-info-card-title-special">{title}</h1>
                    <p className="home-info-card-description">{description}</p>
                </Col>
            </Row>
        </Container>
    )
}

export default HomeInfoCard;