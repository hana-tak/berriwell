import React from "react";
import Form from "../Form/Form";

const SymptomJournal = () => {
  const fields = [
    { name: "date", label: "Date", type: "date", required: true },
    { name: "pain_scale", label: "Pain Scale (1-10)", type: "number", required: true },
    { name: "title", label: "Title", type: "text", required: true, placeholder: "Headache" },
    { name: "notes", label: "Notes", type: "textarea", required: false, placeholder: "Where are you feeling pain? What did you eat?" },
  ];

  const handleSubmit = (data) => {
    console.log("Symptom Entry Submitted:", data);
    // Add your submission logic here
  };

  return <Form title="Add a Symptom Entry" fields={fields} onSubmit={handleSubmit} />;
};

export default SymptomJournal;