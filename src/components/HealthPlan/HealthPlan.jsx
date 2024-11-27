import React from "react";
import Form from "../Form/Form";

const HealthPlan = () => {
  const fields = [
    { name: "task", label: "Task", type: "text", required: true, placeholder: "Take Vitamin D" },
    { name: "amount", label: "Amount", type: "text", required: true, placeholder: "1 scoop" },
    { name: "frequency", label: "Frequency", type: "text", required: true, placeholder: "Daily" },
  ];

  const handleSubmit = (data) => {
    console.log("Health Plan Task Submitted:", data);
    // Add your submission logic here
  };

  return (
    <div>
      <Form title="Add a Health Plan Task" fields={fields} onSubmit={handleSubmit} />
    </div>
  );
};

export default HealthPlan;