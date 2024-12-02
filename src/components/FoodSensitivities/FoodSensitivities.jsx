import React, { useState, useEffect } from "react";
import axios from "axios";
import './FoodSensitivities.scss';

const FoodSensitivities = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("user_id");
  const [sensitivities, setSensitivities] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);

  useEffect(() => {
    const fetchSensitivities = async () => {
      try {
        const response = await axios.get(`${apiUrl}/food-sensitivities`, {
          params: { userId },
        });
        setSensitivities(response.data);
      } catch (error) {
        console.error("Error fetching sensitivities:", error);
      }
    };

    fetchSensitivities();
  }, [userId, apiUrl]);

  const handleEdit = (food) => {
    setEditMode(true);
    setCurrentEdit(food);
  };

  const handleUpdate = async (id, severity) => {
    try {
      await axios.put(`${apiUrl}/food-sensitivities/${id}`, {
        severity,
        user_id: Number(userId),
      });
  
      setSensitivities((prev) =>
        prev.map((item) => (item.id === id ? { ...item, severity } : item))
      );
  
      setEditMode(false);
      setCurrentEdit(null);
    } catch (error) {
      console.error('Error updating severity:', error);
    }
  };

  return (
    <div className="food-sensitivities">
      <h2>Food Sensitivities</h2>
      <div className="categories">
        {Array.from(new Set(sensitivities.map((f) => f.category))).map((category) => (
          <div key={category} className="category">
            <h3>{category}</h3>
            <div className="chips">
              {sensitivities
                .filter((food) => food.category === category)
                .map((food) => (
                  <div
                    key={food.id}
                    className={`chip ${food.severity}`}
                    onClick={() => handleEdit(food)}
                  >
                    {food.food_name}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {editMode && currentEdit && (
        <div className="edit-modal">
          <h3>Edit Severity for {currentEdit.food_name}</h3>
          <div className="severity-options">
            {["unassigned", "normal", "borderline", "elevated"].map((severity) => (
              <div
                key={severity}
                className={`chip ${severity}`}
                onClick={() => handleUpdate(currentEdit.id, severity)}
              >
                {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </div>
            ))}
          </div>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default FoodSensitivities;