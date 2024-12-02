import React from "react";
import FoodSensitivities from "../../components/FoodSensitivities/FoodSensitivities";
import "./FoodPage.scss"

const FoodPage = () => {
  return (
    <div className="food-page">
      <FoodSensitivities />
    </div>
  );
};

export default FoodPage;