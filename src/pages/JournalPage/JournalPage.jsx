import React from "react";
import SymptomJournal from "../../components/SymptomJournal/SymptomJournal";
import "./JournalPage.scss"

const JournalPage = () => {
  return (
    <div className="journal-page">
      <SymptomJournal />
    </div>
  );
};

export default JournalPage;