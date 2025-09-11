import { Button } from "react-bootstrap";
import "../css/OutlineButton.css";
import { Link } from "react-router-dom";

const OutlineButtonLG = ({
  buttonLabel,
  buttonLink,
}) => {
  return (
    <div className="outline-button-container-lg">
        <Link className="outline-button-link-lg" to={buttonLink}>
          <Button className="outline-button-component-lg  cursor-target">
            {buttonLabel}
          </Button>
        </Link>
    </div>
  );
};

export default OutlineButtonLG;
