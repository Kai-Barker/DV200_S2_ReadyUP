import logo from "./assets/images/ReadyUPLogo.png";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.js";
import "bootstrap/dist/css/bootstrap.min.css";
import TargetCursor from "./components/TargetCursor.js";
import Login from './pages/Login.js'
import Register from './pages/Register.js'

function App() {
  return (
    <div className="App_bg">
      <TargetCursor 
        spinDuration={4}
        hideDefaultCursor={true}
      />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
