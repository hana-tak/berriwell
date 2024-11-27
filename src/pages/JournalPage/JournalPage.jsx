import React from "react";
import SymptomJournal from "../../components/SymptomJournal/SymptomJournal";
import "./JournalPage.scss"

const JournalPage = () => {
  return (
    <div className="journal-page">
      <h2>Symptom Journal</h2>
      <SymptomJournal />
    </div>
  );
};

export default JournalPage;