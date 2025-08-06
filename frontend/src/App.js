import logo from "./assets/images/ReadyUPLogo.png";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.js";
import "bootstrap/dist/css/bootstrap.min.css";
import TargetCursor from "./components/TargetCursor.js";

function App() {
  return (
    <div className="">
      <TargetCursor 
        spinDuration={4}
        hideDefaultCursor={true}
      />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
