import React from "react";
import FoodSensitivities from "../../components/FoodSensitivities/FoodSensitivities";
import "./FoodPage.scss";
import Header from "../../components/Header/Header";

const FoodPage = () => {
  return (
    <div className="food-page">
      <Header />
      <FoodSensitivities />
    </div>
  );
};

export default FoodPage;
