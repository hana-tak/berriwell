import React from "react";
import AppointmentReminder from "../../components/AppointmentReminder/AppointmentReminder";
import HealthPlan from "../../components/HealthPlan/HealthPlan";
import './HomePage.scss'

const HomePage = () => {
  return (
    <div className="home-page">
      <AppointmentReminder />
      <HealthPlan />
    </div>
  );
};

export default HomePage;