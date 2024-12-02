import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Header.scss";
import blueberries from "../../assets/blueberries.png";

const Header = () => {
  const userId = localStorage.getItem("user_id");
  const apiUrl = import.meta.env.VITE_API_URL;
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get(`${apiUrl}/users/${userId}`);
        setUserName(response.data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserName();
  }, [userId, apiUrl]);

  return (
    <header className="header">
    <img src= {blueberries} alt="blueberries icon" />
      <h1>Hello, {userName || "User"}!</h1>
    </header>
  );
};

export default Header;
