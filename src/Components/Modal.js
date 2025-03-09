import React, { useEffect, useState } from 'react';
import './Modal.css';
import verbHashes from './verbHashes';

function Modal() {
  const [submitCount, setSubmitCount] = useState(0);  // Track the number of form submissions
  const [buttonText, setButtonText] = useState("Check Answers");  // Manage button text state

  const pageNumber = 0;
  console.log("page number = " + pageNumber);

  const retrievedVerbMap = verbHashes("present");
  console.log(retrievedVerbMap);

  // Get number of different verbs to be studied. 
  const numberOfVerbsToPractice = Object.keys(retrievedVerbMap).length;;
  console.log(numberOfVerbsToPractice);

  useEffect(() => {
    const form = document.getElementById("verbForm");
    if (form) {
      form.addEventListener("submit", handleSubmit);
    }

    // Cleanup event listener on unmount
    return () => {
      if (form) {
        form.removeEventListener("submit", handleSubmit);
      }
    };
  }, [submitCount]);

  // Logic for form submission
  function handleSubmit(event) {
    event.preventDefault();  // Prevent the form from submitting the traditional way
    setSubmitCount((prevCount) => prevCount + 1);  // Increment submit count

    if (submitCount === 0) {
      // First time: validate the form and show errors
      validateForm();
      setButtonText("Continue");  // Change button text to 'Continue'
      lockInputs(); // Disable all inputs, but keep submit enabled
    } else if (submitCount === 1) {
      // Second time: you could perform final form submission or show a summary
      console.log("Second click - handling final submission or next step.");
    }
  }

  // Prevent user interaction after first submit
  function lockInputs() {
    const form = document.getElementById("verbForm");
    if (form) {
      Array.from(form.elements).forEach((input) => {
        if (input.type !== "submit") {
          input.disabled = true; // Disable all fields
        }
      });
    }
    console.log("consider it locked Ma'am");
  }

  // Function to highlight incorrect answers
  const highlightIncorrectAnswer = (input) => {
    input.classList.add('incorrect');
  };

  // Function to highlight correct answers
  const highlightCorrectAnswer = (input) => {
    input.classList.add('correct');
  };

  // Logic to check if the user's answer is incorrect
  const answerIsIncorrect = (userAnswer) => {
    const presentHash = {
      "ich": "gehe",
      "du": "gehst",
      "er": "geht",
      "wir": "gehen",
      "ihr": "geht",
      "sie": "gehen"
    };

    const correctAnswer = presentHash[userAnswer.name];

    return userAnswer.value.trim() !== correctAnswer;
  };

  // Function to validate the form inputs
  function validateForm() {
    const form = document.forms["verbForm"];
    Array.from(form.elements).forEach((input) => {
      if (input.type !== "submit") {
        if (answerIsIncorrect(input)) {
          highlightIncorrectAnswer(input);
        } else {
          highlightCorrectAnswer(input);
        }
      }
    });
  }

  // Floating labels logic
  useEffect(() => {
    const floatLabels = document.querySelectorAll('.floatLabel');
    floatLabels.forEach((input) => {
      const label = input.nextElementSibling;

      input.addEventListener("focus", () => {
        label.classList.add('active');
      });

      input.addEventListener("blur", () => {
        if (!input.value.trim()) {
          label.classList.remove('active');
        }
      });

      if (input.value.trim()) {
        label.classList.add('active');
      }
    });
  }, []);

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <header>
          <h2 className="modal-title">Present Tense</h2>
          <h3 className="modal-subtitle">Gehen</h3>
        </header>
        <form id="verbForm" name="verbForm">
          <div className="form-group">
            <div className="controls">
              <input type="text" id="ich" className="floatLabel" name="ich" />
              <label htmlFor="ich">Ich</label>
            </div>
            <div className="controls">
              <input type="text" id="du" className="floatLabel" name="du" />
              <label htmlFor="du">Du</label>
            </div>
            <div className="controls">
              <input type="text" id="er" className="floatLabel" name="er" />
              <label htmlFor="er">Er</label>
            </div>
            <div className="controls">
              <input type="text" id="wir" className="floatLabel" name="wir" />
              <label htmlFor="wir">Wir</label>
            </div>
            <div className="controls">
              <input type="text" id="ihr" className="floatLabel" name="ihr" />
              <label htmlFor="ihr">Ihr</label>
            </div>
            <div className="controls">
              <input type="text" id="sie" className="floatLabel" name="sie" />
              <label htmlFor="sie">Sie</label>
            </div>
          </div>
          <input type="submit" className="submitButton" id="submitButton" value={buttonText} />
        </form>
      </div>
    </div>
  );
}

export default Modal;
