import OutlineButton from "../components/OutlineButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import CheatCode from "./CheatCode";
import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";

const LoginForm = () => {
  const navigate = useNavigate();
  const handleCheatInput = (direction) => {
    setCheatCode(cheatCode + direction);
    console.log(cheatCode);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    try {
      const response = await api.post("/auth/register", {
        username,
        email,
        password,
        cheatCode,
      });
      console.log(response.data);
      console.log("Registration successful");
      ReactGA.event("registered_user");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setMessage("Error Registering User");
      ClearFields();
    }
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cheatCode, setCheatCode] = useState("");
  const [message, setMessage] = useState("");


   const ClearFields = () => {
    setCheatCode("");
    setPassword("");
    setConfirmPassword("");
  }
  return (
    <Form onSubmit={handleSubmit}>
      <div className="login-form-group">
        <Form.Group className="mb-3 login-form-group" controlId="formBasicEmail">
          <Form.Label>Username:</Form.Label>
          <Form.Control className="cursor-target login-form-field" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
      </div>
      <div className="login-form-group">
        <Form.Group className="mb-3 login-form-group" controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control className="cursor-target login-form-field" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
      </div>
      <div className="login-form-group">
        <Form.Group className="mb-3 login-form-group" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control className="cursor-target login-form-field" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
      </div>
      <div className="login-form-group">
        <Form.Group className="mb-3 login-form-group" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            className="cursor-target login-form-field"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
      </div>
      <div className="login-center-component-wrapper">
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <h5>Enter Your Cheat Code</h5>
          <CheatCode onInput={handleCheatInput} />
        </Form.Group>
      </div>
      <h5 style={{marginTop:'2vh', color:'red'}}>{message}</h5>
      <div className="login-center-component-wrapper" style={{ marginTop: "3vh" }}>
        <Button className="cursor-target login-submit-button" type="submit">
          LETS GO
        </Button>
      </div>
      <h3>Already Have A ReadyUP Account?</h3>
      <div style={{ marginBottom: "5vh" }}>
        <OutlineButton buttonLink={"/Login"} buttonLabel={"Login"} />
      </div>
    </Form>
  );
};

export default LoginForm;
