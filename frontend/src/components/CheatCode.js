import '../css/CheatCode.css';

const CheatCode = ({ onInput }) => {
  const handleClick = (direction) => {
    onInput(direction); // Call parent function with the direction
  };

  return (
    <div className="cheatcode-container">
      <h5 className="cheatcode-title">Enter Your Cheat Code</h5>
      <div className="cheatcode-grid">
        <button className="cheat-button" onClick={() => handleClick("up")}>↑</button>
        <div></div>
        <div></div>

        <button className="cheat-button" onClick={() => handleClick("left")}>←</button>
        <button className="cheat-button center-btn" disabled>●</button>
        <button className="cheat-button" onClick={() => handleClick("right")}>→</button>

        <div></div>
        <div></div>
        <button className="cheat-button" onClick={() => handleClick("down")}>↓</button>
      </div>
    </div>
  );
};

export default CheatCode;
