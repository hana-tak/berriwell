import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuBar.scss";
import home from "../../assets/home.png";
import stomach from "../../assets/stomach.png";
import journal from "../../assets/journal.png";

const MenuBar = () => {
  return (
    <nav className="menu-bar">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <img src={home} alt="Home" />
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/food-insensitivities"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <img src={stomach} alt="Food Sensitivities"/>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/symptom-journal"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <img src={journal} alt="Symptom Journal"/>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;