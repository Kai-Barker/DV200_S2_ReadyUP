import OutlineButton from "../components/OutlineButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import CheatCode from "./CheatCode";

const LoginForm = () => {
    const handleCheatInput = (direction) => {
  console.log("Cheat code input:", direction);
};
  return (
    <Form>
      <div className="login-form-group">
        <Form.Group
          className="mb-3 login-form-group"
          controlId="formBasicEmail"
        >
          <Form.Label>Email:</Form.Label>
          <Form.Control
            className="cursor-target login-form-field"
            type="email"
            required
          />
        </Form.Group>
      </div>
      <div className="login-form-group">
        <Form.Group
          className="mb-3 login-form-group"
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="cursor-target login-form-field"
            type="password"
            required
          />
        </Form.Group>
      </div>
      <div className="login-form-group">
        <Form.Group
          className="mb-3 login-form-group"
          controlId="formBasicPassword"
        >
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            className="cursor-target login-form-field"
            type="password"
            required
          />
        </Form.Group>
      </div>
      <div className="login-center-component-wrapper">
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <h5>Enter Your Cheat Code</h5>
        <CheatCode onInput={handleCheatInput}/>
      </Form.Group>

      </div>
      <div className="login-center-component-wrapper" style={{marginTop:"3vh"}}>
        <Button className="cursor-target login-submit-button" type="submit">
          LETS GO
        </Button>
      </div>
      <h3>Already Have A ReadyUP Account?</h3>
      <div style={{marginBottom:"5vh"}}>

      <OutlineButton buttonLink={"/Login"} buttonLabel={"Login"} />
      </div>
    </Form>
  );
};

export default LoginForm;
