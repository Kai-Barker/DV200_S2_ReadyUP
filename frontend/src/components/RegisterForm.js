import OutlineButton from "../components/OutlineButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import CheatCode from "./CheatCode";
import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import { toast } from 'react-toastify';


const LoginForm = () => {
  const navigate = useNavigate();
  const handleCheatInput = (direction) => {
    setCheatCode(cheatCode + direction);
    setCheatCodeDisplay(cheatCodeDisplay + direction + " ");
    console.log(cheatCode);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    if (password.length == 0) {
      setMessage("Please enter a password");
    } else if (cheatCode.length == 0) {
      setMessage("Please enter a Cheat Code");
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
      toast.success("Successfully Registered User");
    } catch (error) {
      console.error(error);
      setMessage("Error Registering User");
      toast.error("Failed to Register User")
      ClearFields();
    }
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cheatCode, setCheatCode] = useState("");
  const [cheatCodeDisplay, setCheatCodeDisplay] = useState("");
  const [message, setMessage] = useState("");

  const ClearFields = () => {
    setCheatCode("");
    setPassword("");
    setConfirmPassword("");
    setCheatCodeDisplay("");
  };
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
      <div className="my-4" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h5>Enter your cheat code</h5>
        <h6>(Think of it like a second password)</h6>
      </div>
      <div className="login-center-component-wrapper">
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <CheatCode onInput={handleCheatInput} />
        </Form.Group>
      </div>
      <div className="my-4" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h6>{cheatCodeDisplay}</h6>
      </div>
      <h5 style={{ marginTop: "2vh", color: "red" }}>{message}</h5>
      <div className="login-center-component-wrapper" style={{ marginTop: "3vh" }}>
        <Button className="cursor-target login-submit-button" type="submit">
          LETS GO
        </Button>
      </div>
      <h3 style={{ textAlign: "center", marginBottom: "5vh" }}>Already Have A ReadyUP Account?</h3>
      <div style={{ marginBottom: "5vh" }}>
        <OutlineButton buttonLink={"/Login"} buttonLabel={"Login"} />
      </div>
    </Form>
  );
};

export default LoginForm;
