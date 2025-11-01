import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RegisterForm from "../components/RegisterForm";
import '../css/Login.css';
import useSeoPageInfo from "../customHooks/useSeoPageInfo";

const Login = () => {
  useSeoPageInfo({
    title:"Create an Account to Find Groups | ReadyUP",
    description:"Create your free ReadyUP account in seconds. Join a community of gamers, create your own LFG posts, and find teammates for any game."
  })
  return (
    <div className="login-page">
      <Container style={{ maxWidth: "40vw", backgroundColor:'rgba(237, 228, 241, 0.2)', paddingTop:"2vw", borderRadius:"40px", marginTop:"5vh", marginBottom:"5vh"}}>
        <Row>
          <Col className="login-form-col">
            <h1 className="login-header">Register</h1>
            <RegisterForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
