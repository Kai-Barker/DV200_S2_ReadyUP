import { Container, Row, Col} from 'react-bootstrap';
import '../css/CheatCode.css';
import UpArrow from '../assets/images/UpArrow.svg'
import LeftArrow from '../assets/images/LeftArrow.svg'
import RightArrow from '../assets/images/RightArrow.svg'
import DownArrow from '../assets/images/DownArrow.svg'
import CentreDpad from '../assets/images/CenterDPAD.svg'

const CheatCode = ({onInput}) => {
  return (
    <div className="cheatcode-container">
      <div className="dpad-grid">
        <div></div>
        <div className="cursor-target dpad-button up-arrow" onClick={() => onInput('up')}><img src={UpArrow} /></div>
        <div></div>

        <div className="cursor-target dpad-button left-arrow" onClick={() => onInput('left')}><img src={LeftArrow} /></div>
        <div className="dpad-button centre-dot"><img src={CentreDpad} /></div>
        <div className="cursor-target dpad-button right-arrow" onClick={() => onInput('right')}><img src={RightArrow} /></div>

        <div></div>
        <div className="cursor-target dpad-button down-arrow" onClick={() => onInput('down')}><img src={DownArrow} /></div>
        <div></div>
      </div>
    </div>
  );
};

export default CheatCode;
