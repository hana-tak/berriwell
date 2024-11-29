import React from "react";
import FoodInsensitivities from "../../components/FoodInsensitivities/FoodInsensitivities";
import "./FoodPage.scss"

const FoodPage = () => {
  return (
    <div className="food-page">
      <FoodInsensitivities />
    </div>
  );
};

export default FoodPage;