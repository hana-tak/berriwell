import React from "react";
import AppointmentReminder from "../../components/AppointmentReminder/AppointmentReminder";
import HealthPlan from "../../components/HealthPlan/HealthPlan";
import "./HomePage.scss";
import Header from "../../components/Header/Header";

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <AppointmentReminder />
      <HealthPlan />
    </div>
  );
};

export default HomePage;
