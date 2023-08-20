import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login.jsx";
// import { GoogleOAuthProvider } from "@react-oauth/google";
import LoadingSpinner from "./pages/LoadingSpinner";
import Home from "./pages/Home";

export default function App() {
  return (
    <Router>

        <Routes>
          <Route path="/google/callback" element={<LoadingSpinner/>}/>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home/>} />

        </Routes>
    </Router>
  );
}
