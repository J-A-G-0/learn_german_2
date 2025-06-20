import React, { useState } from "react";
import "../Styles/Global.css";
import { getQuizData } from "./databaseInteractionHandler";
import QuizForm from "./QuizForm";
import { SubjectToBeStudied } from "../types";

interface ModalProps {
  title: SubjectToBeStudied;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, onClose }) => {
  const [verbNumber, setVerbNumber] = useState(0);
  const quizData = getQuizData(title);

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <header>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h2 className="modal-title">{title} Tense</h2>
          <h3 className="modal-subtitle">
            {quizData.wordsToStudy[verbNumber]}
          </h3>
        </header>
        <QuizForm
          quizData={quizData}
          verbNumber={verbNumber}
          setVerbNumber={setVerbNumber}
          onClose={onClose}
        />
      </div>
    </div>
  );
}

export default Modal;