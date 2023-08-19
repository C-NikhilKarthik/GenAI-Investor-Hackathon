import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App() {
  return (
    <Router>
      <GoogleOAuthProvider clientId="210935133300-96om7jdhe718pp5mpiv6rvl4tefe39r8.apps.googleusercontent.com">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </GoogleOAuthProvider>
    </Router>
  );
}
