import { Button } from "react-bootstrap";
import "../css/OutlineButton.css";
import { Link } from "react-router-dom";

const OutlineButton = ({
  buttonLabel,
  buttonLink,
}) => {
  return (
    <div className="outline-button-container">
        <Link className="outline-button-link" to={buttonLink}>
          <Button className="outline-button-component  cursor-target">
            {buttonLabel}
          </Button>
        </Link>
    </div>
  );
};

export default OutlineButton;
