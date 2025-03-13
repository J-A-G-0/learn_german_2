import React, { useEffect, useState } from 'react';
import './Modal.css';
import { getVerbArrayFromTenseName } from '../Data/Verbs';
import verbs from '../Data/Verbs';

function Modal( {title, onClose } ) {
  const [submitCount, setSubmitCount] = useState(0);  // Track the number of form submissions
  const [buttonText, setButtonText] = useState("Check Answers");  // Manage button text state
  const [verbNumber, setVerbNumber] = useState(0); // Track the current verb index

  // ###
  // Retrieve verb data for the current modal. 
  // ###

  console.log("verb number = " + verbNumber);

  const tenseToStudy = title.toLowerCase();
  console.log("tenseToStudy = " + tenseToStudy);

  const verbsToStudyArray = getVerbArrayFromTenseName(tenseToStudy);
  console.log("verb array to study = " + verbsToStudyArray);

  // Get number of different verbs to be studied. 
  const numberOfVerbsToStudy = verbsToStudyArray.length;
  console.log("number of verbs to study = " + numberOfVerbsToStudy);

  const currentVerbToStudy = verbsToStudyArray[verbNumber]
  console.log("currentVerbToStudy = " + currentVerbToStudy);

  // Note syntax here. The following would not log properly:
  // const currentVerbToStudyDictionary = verbs[currentVerbToStudy][tenseToStudy];
  const currentVerbToStudyDictionary = verbs[currentVerbToStudy][tenseToStudy];
  console.log("Full dictionary for this verb = ", currentVerbToStudyDictionary);

// ###


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
      floatAllLabels();
    } else if (submitCount === 1) {
        // Move to the next verb if there is one
        if (verbNumber < numberOfVerbsToStudy - 1) {
          setVerbNumber((prevVerbNumber) => prevVerbNumber + 1);
          setSubmitCount(0); // Reset submit count for the new verb
          setButtonText("Check Answers"); // Reset button text
          resetInputs(); // Clear the form for the next verb
          resetFloatingLabels();
          resetCorrectAnswers();
          resetInputTextColour();
        } else {
          onClose();
          // console.log("Reached the last verb. Handle completion.");
        }
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

  function resetInputs() {
    document.querySelectorAll("#verbForm input").forEach((input) => {
      input.disabled = false; // Enable inputs
      input.parentElement.classList.remove("incorrect", "correct"); // Remove highlight
      if (input.type !== "submit") input.value = ""; // Clear input fields
    });
  }

  function resetFloatingLabels() {
    const floatLabels = document.querySelectorAll('.floatLabel');
    floatLabels.forEach((input) => {
      const label = input.nextElementSibling;
      if (!input.value.trim()) {
        label.classList.remove('active'); // Remove active class when input is empty
      }
    });
  }

  function floatAllLabels() {
    const floatLabels = document.querySelectorAll('.floatLabel');
    floatLabels.forEach((input) => {
      const label = input.nextElementSibling;
        label.classList.add('active'); // Remove active class when input is empty
    });
  }



  function resetCorrectAnswers() {
    const correctAnswerDivs = document.querySelectorAll("#verbForm .correct-answer").forEach((correctAnswerDiv) => {
      correctAnswerDiv.classList.remove("visible");
    });
  };

  function resetInputTextColour() {
    const inputTexts = document.querySelectorAll("#verbForm input").forEach((inputText) => {
      inputText.classList.remove('incorrect');
    });
  }

  // Function to highlight incorrect answers
  const highlightInputContainerOfIncorrectAnswer = (inputParentElement) => {
    inputParentElement.classList.add('incorrect');
  };

  // Function to highlight correct answers
  const highlightInputContainerOfCorrectAnswer = (inputParentElement) => {
    inputParentElement.classList.add('correct');
  };

  // Logic to check if the user's answer is incorrect
  const answerIsIncorrect = (userAnswer) => {
    const correctAnswer = currentVerbToStudyDictionary[userAnswer.name]

    return userAnswer.value.trim().toLowerCase() !== correctAnswer;
  };

  const revealCorrectAnswer = (userAnswer) => {
    const correctAnswer = currentVerbToStudyDictionary[userAnswer.name]

    const correctAnswerDiv = document.getElementById("correct-answer-"+userAnswer.name);
    correctAnswerDiv.textContent = correctAnswer;
    correctAnswerDiv.classList.add('visible');
  };

  const highlightUsersWrongInputText = (userAnswer) => {
    userAnswer.classList.add("incorrect")
  };

  // Function to validate the form inputs
  function validateForm() {
    const form = document.forms["verbForm"];
    Array.from(form.elements).forEach((input) => {
      if (input.type !== "submit") {
        if (answerIsIncorrect(input)) {
          highlightInputContainerOfIncorrectAnswer(input.parentElement);
          revealCorrectAnswer(input);
          highlightUsersWrongInputText(input);
        } else {
          highlightInputContainerOfCorrectAnswer(input.parentElement);
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

  function resetFloatingLabels() {
    const floatLabels = document.querySelectorAll('.floatLabel');
    floatLabels.forEach((input) => {
      const label = input.nextElementSibling;
      if (!input.value.trim()) {
        label.classList.remove('active'); // Remove active class when input is empty
      }
    });
  }
  

  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <header>
          {/* Close Button (X) */}
          <button className="close-button" onClick={onClose}>&times;</button>
          <h2 className="modal-title">{title} Tense</h2>
          <h3 className="modal-subtitle">{currentVerbToStudy}</h3>
        </header>
        <form id="verbForm" name="verbForm">
          <div className="form-group">
            <div className="form-section">
              <div class="input-container">
                <div class="correct-answer" id="correct-answer-ich">Incorrect</div>
                <input type="text" id="input-ich" className="floatLabel" name="ich" />
                <label htmlFor="ich">ich</label>
              </div>
            </div>
            <div className="form-section">
              <div class="input-container">
                <div class="correct-answer" id="correct-answer-du">Incorrect</div>
                <input type="text" id="input-du" className="floatLabel" name="du" />
                <label htmlFor="du">du</label>
              </div>
            </div>
            <div className="form-section">
              <div class="input-container">
                <div class="correct-answer" id="correct-answer-er">Incorrect</div>
                <input type="text" id="input-er" className="floatLabel" name="er" />
                <label htmlFor="er">er / sie / es</label>
              </div>
            </div>
            <div className="form-section">
              <div class="input-container">
                <div class="correct-answer" id="correct-answer-wir">Incorrect</div>
                <input type="text" id="input-wir" className="floatLabel" name="wir" />
                <label htmlFor="wir">wir</label>
              </div>
            </div>
            <div className="form-section">
              <div class="input-container">
                <div class="correct-answer" id="correct-answer-ihr">Incorrect</div>
                <input type="text" id="input-ihr" className="floatLabel" name="ihr" />
                <label htmlFor="ihr">ihr</label>
              </div>
            </div>
            <div className="form-section">
              <div class="input-container">
                <div class="correct-answer" id="correct-answer-sie">Incorrect</div>
                <input type="text" id="input-sie" className="floatLabel" name="sie" />
                <label htmlFor="sie">sie / Sie</label>
              </div>
            </div>
          </div>
          <input type="submit" className="submitButton" id="submitButton" value={buttonText} />
        </form>
      </div>
    </div>
  );
}

export default Modal;
