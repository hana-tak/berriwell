import React from "react";
import SymptomJournal from "../../components/SymptomJournal/SymptomJournal";
import "./JournalPage.scss";
import Header from "../../components/Header/Header";

const JournalPage = () => {
  return (
    <div className="journal-page">
      <Header />
      <SymptomJournal />
    </div>
  );
};

export default JournalPage;
