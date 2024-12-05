import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

import HomePage from "./pages/HomePage/HomePage";
import FoodPage from "./pages/FoodPage/FoodPage";
import JournalPage from "./pages/JournalPage/JournalPage";

import MenuBar from "./components/MenuBar/MenuBar";

const App = () => {
  useEffect(() => {
    const defaultUserId = '1'; // change to '2' or '3' to see alternate patient data, change to '4' to see a blank/new user profile
    localStorage.setItem('user_id', defaultUserId);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/food-insensitivities" element={<FoodPage />} />
        <Route path="/symptom-journal" element={<JournalPage />} />
      </Routes>
      <MenuBar />
    </Router>
  );
};

export default App;
