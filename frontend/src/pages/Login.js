import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "../components/LoginForm";
import '../css/Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <Container style={{ maxWidth: "40vw", backgroundColor:'rgba(237, 228, 241, 0.2)', paddingTop:"2vw", borderRadius:"40px" }}>
        <Row>
          <Col className="login-form-col">
            <h1 className="login-header">Login</h1>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
