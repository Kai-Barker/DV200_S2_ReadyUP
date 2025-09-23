import OutlineButton from "../components/OutlineButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import CheatCode from "./CheatCode";
import { useState, useEffect } from "react";
import api from "../api";

const LoginForm = () => {
  const handleCheatInput = (direction) => {
    setCheatCode(cheatCode + direction);
    console.log(cheatCode);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
        cheatCode,
      });
      console.log(response.data);
      console.log("Login successful");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.error(error);
    }
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cheatCode, setCheatCode] = useState("");
  return (
    <Form onSubmit={handleSubmit}>
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
      <div className="login-center-component-wrapper">
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <h5>Enter Your Cheat Code</h5>
          <CheatCode onInput={handleCheatInput} />
        </Form.Group>
      </div>
      <div className="login-center-component-wrapper" style={{ marginTop: "3vh" }}>
        <Button className="cursor-target login-submit-button" type="submit">
          LETS GO
        </Button>
      </div>
      <h3>Don't Have A ReadyUP Account?</h3>
      <div style={{ marginBottom: "5vh" }}>
        <OutlineButton buttonLink={"/Register"} buttonLabel={"Register"} />
      </div>
    </Form>
  );
};

export default LoginForm;
