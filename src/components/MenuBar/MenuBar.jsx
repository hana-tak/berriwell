import React from "react";
import { NavLink } from "react-router-dom";
import "./MenuBar.scss"; // Styling for the menu bar

const MenuBar = () => {
  return (
    <nav className="menu-bar">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/food-insensitivities"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Food Insensitivities
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/symptom-journal"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Symptom Journal
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MenuBar;
