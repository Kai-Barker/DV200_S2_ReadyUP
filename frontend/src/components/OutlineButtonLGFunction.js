import { Button } from "react-bootstrap";
import "../css/OutlineButton.css";

const OutlineButtonLGFunction = ({
  buttonLabel,
  buttonFunction,
}) => {
  return (
    <div className="outline-button-container-lg">
          <Button className="outline-button-component-lg  cursor-target" onClick={buttonFunction}>
            {buttonLabel}
          </Button>
    </div>
  );
};

export default OutlineButtonLGFunction;
