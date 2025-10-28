import logo from "./assets/images/ReadyUPLogo.png";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home.js";
import "bootstrap/dist/css/bootstrap.min.css";
import TargetCursor from "./components/TargetCursor.js";
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import CategoriesPage from "./pages/CategoriesPage.js";
import BrowsePostsPage from "./pages/BrowsePostsPage.js";
import AdminPage from "./pages/Admin.js";
import Footer from "./components/Footer.js";
import Profile from './pages/UserProfile.js';
import TestPage from "./pages/TestPage.js";
import MyPostsPage from "./pages/MyPosts.js";
import ReactGA from 'react-ga4';
import { useState, useEffect } from "react";
import FriendsList from "./components/FriendsList.js";
import AnalyticsTracker from "./components/AnalyticsTracker.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MEASUREMENT_ID = "G-KMH2BFXSFH";

function App() {
  //Google analytics
  useEffect(() => {
        ReactGA.initialize(MEASUREMENT_ID);
      }, []);
      const handleFriendsListOpen = () => {
    setIsFriendsListOpen(true);
  };

  const handleFriendsListClose = () => {
    setIsFriendsListOpen(false);
  };

  const [isFriendsListOpen, setIsFriendsListOpen] = useState(false);

  return (
    <div className="App_bg">
      <TargetCursor 
        spinDuration={4}
        hideDefaultCursor={true}
      />
      <Router>
        <AnalyticsTracker />
        <Navbar onOpenFriendsList={handleFriendsListOpen}/>
        <FriendsList open={isFriendsListOpen} onClose={handleFriendsListClose} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/browse-posts/:gameTitle" element={<BrowsePostsPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/myposts" element={<MyPostsPage />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
