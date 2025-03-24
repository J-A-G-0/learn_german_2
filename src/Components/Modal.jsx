import React, { useState } from "react";
import "./Modal.css";
import verbs from "../Data/Verbs";
import { getMapOfSubjectData } from "./databaseInteractionHandler";
import QuizForm from "./QuizForm";

function Modal({ title, onClose }) {
  const [verbNumber, setVerbNumber] = useState(0);
  const mapOfSubjectData = getMapOfSubjectData(title);

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <header>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h2 className="modal-title">{title} Tense</h2>
          <h3 className="modal-subtitle">
            {mapOfSubjectData.get("wordsToStudyArray")[verbNumber]}
          </h3>
        </header>
        <QuizForm
          mapOfSubjectData={mapOfSubjectData}
          verbNumber={verbNumber}
          setVerbNumber={setVerbNumber}
          onClose={onClose}
        />
      </div>
    </div>
  );
}

export default Modal;