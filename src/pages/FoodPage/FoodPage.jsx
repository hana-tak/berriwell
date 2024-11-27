import React from "react";
import FoodInsensitivities from "../../components/FoodInsensitivities/FoodInsensitivities";
import "./FoodPage.scss"

const FoodPage = () => {
  return (
    <div className="food-page">
      <h2>Food Sensitivities</h2>
      <FoodInsensitivities />
    </div>
  );
};

export default FoodPage;