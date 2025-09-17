import { Button } from "react-bootstrap";
import "../css/OutlineButton.css";

const OutlineButton = ({
  buttonLabel,
  buttonFunction,
}) => {
  return (
    <div className="outline-button-container">
          <Button className="outline-button-component  cursor-target" onClick={buttonFunction}>
            {buttonLabel}
          </Button>
    </div>
  );
};

export default OutlineButton;
