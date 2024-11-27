import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";

import HomePage from "./pages/HomePage/HomePage";
import FoodPage from "./pages/FoodPage/FoodPage";
import JournalPage from "./pages/JournalPage/JournalPage";

import Header from "./components/Header/Header";
import MenuBar from "./components/MenuBar/MenuBar";

const App = () => {
  return (
    <Router>
      <Header />
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
