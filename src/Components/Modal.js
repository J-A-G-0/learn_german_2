import React, { useEffect, useState } from 'react';
import './Modal.css';
import { getVerbArrayFromTenseName } from '../Data/Verbs';
import verbs from '../Data/Verbs';
import FormSection from './FormSection';
import { getMapOfSubjectData } from "./databaseInteractionHandler";
import { Form } from 'react-router-dom';

function Modal( {title, onClose } ) {


  // Retrieve verb data for the current modal. Set up hooks. 

  const [verbNumber, setVerbNumber] = useState(0); // Track the current verb index

  const mapOfSubjectData = getMapOfSubjectData(title);
  // This has to stay to be passed to a function later on.
  const currentVerbToStudy = mapOfSubjectData.get("wordsToStudyArray")[verbNumber]
  const currentVerbToStudyDictionary = verbs[currentVerbToStudy][mapOfSubjectData.get("subjectToBeStudied")];

  const [submitCount, setSubmitCount] = useState(0);  // Track the number of form submissions
  const [buttonText, setButtonText] = useState("Check Answers");  // Manage button text state
  // Get an array containing all the labels (e.g. "ich", "du", etc)
  const [inputNames] = useState(mapOfSubjectData.get("labelsAsArray"))
  console.log("inputNames = ", inputNames);
  const [visibleInputs, setVisibleInputs] = useState([inputNames[0]]); // Start with first input visible

  console.log("verb number = " + verbNumber);
  // console.log("tenseToStudy = " + tenseToStudy);
  // console.log("verb array to study = " + verbsToStudyArray);
  // console.log("number of verbs to study = " + mapOfSubjectData.get("numberOfVerbsToStudy"));
  console.log("currentVerbToStudy = " + currentVerbToStudy);
  console.log("Full dictionary for this verb = ", currentVerbToStudyDictionary);


  // Form submission

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
        if (verbNumber < mapOfSubjectData.get("numberOfVerbsToStudy") - 1) {
          setVerbNumber((prevVerbNumber) => prevVerbNumber + 1);
          setSubmitCount(0); // Reset submit count for the new verb
          setButtonText("Check Answers"); // Reset button text
          resetInputs(); // Clear the form for the next verb
          resetFloatingLabels();
          resetCorrectAnswers();
          resetInputTextColour();
          resetFormToOneSection();
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

  
  // Floating Labels 

  function resetFloatingLabels() {
    const floatLabels = document.querySelectorAll('.floatLabel');
    floatLabels.forEach((input) => {
      const label = input.nextElementSibling;
      label.classList.remove('active'); // Remove active class when input is empty
      // if (!input.value.trim()) {
      //   label.classList.remove('active'); // Remove active class when input is empty
      // }
    });
  }

  function floatAllLabels() {
    const floatLabels = document.querySelectorAll('.floatLabel');
    floatLabels.forEach((input) => {
      const label = input.nextElementSibling;
        label.classList.add('active'); // Remove active class when input is empty
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

    // If input already has a value, ensure label is active
    if (input.value.trim()) {
      label.classList.add('active');
    }
  });

  // Cleanup event listeners on unmount
  return () => {
    floatLabels.forEach((input) => {
      const label = input.nextElementSibling;

      input.removeEventListener("focus", () => {
        label.classList.add('active');
      });

      input.removeEventListener("blur", () => {
        if (!input.value.trim()) {
          label.classList.remove('active');
        }
      });
    });
  };
}, [visibleInputs]); // 🔥 Re-run this effect every time visibleInputs changes
  
    function resetFloatingLabels() {
      const floatLabels = document.querySelectorAll('.floatLabel');
      floatLabels.forEach((input) => {
        const label = input.nextElementSibling;
        if (!input.value.trim()) {
          label.classList.remove('active'); // Remove active class when input is empty
        }
      });
    }
  


  // Input div

  function resetInputs() {
    document.querySelectorAll("#verbForm input").forEach((input) => {
      input.disabled = false; // Enable inputs
      input.parentElement.classList.remove("incorrect", "correct"); // Remove highlight
      if (input.type !== "submit") input.value = ""; // Clear input fields
    });
  }

  function resetInputTextColour() {
    const inputTexts = document.querySelectorAll("#verbForm input").forEach((inputText) => {
      inputText.classList.remove('incorrect');
    });
  }

  const highlightUsersWrongInputText = (userAnswer) => {
    userAnswer.classList.add("incorrect")
  };

  const setUserInputToNoAnswerGivenWhereBlank = (userAnswer) => {
    // console.log("userAnswer in the method ", userAnswer)
    if (userAnswer.value == null || userAnswer.value == "") {
      userAnswer.value = "No Answer Given"
    }
    // console.log("and at the end of the function ", userAnswer)
  };

  const handleInputFocus = (inputName) => {
    const currentIndex = inputNames.indexOf(inputName);
    const nextIndex = currentIndex + 1;

    if (nextIndex < inputNames.length) {
        setVisibleInputs((prev) => [...prev, inputNames[nextIndex]]);
    }
        // Ensure floating labels update for new inputs
    setTimeout(() => {
      document.querySelectorAll('.floatLabel').forEach((input) => {
        const label = input.nextElementSibling;
        if (input.value.trim()) {
          label.classList.add('active');
        }
      });
    }, 50);
    };

  
  // correct answer div

  function resetCorrectAnswers() {
    const correctAnswerDivs = document.querySelectorAll("#verbForm .correct-answer").forEach((correctAnswerDiv) => {
      correctAnswerDiv.classList.remove("visible");
    });
  };

  const revealCorrectAnswer = (userAnswer) => {
    const correctAnswer = currentVerbToStudyDictionary[userAnswer.name]

    const correctAnswerDiv = document.getElementById("correct-answer-"+userAnswer.name);
    correctAnswerDiv.textContent = correctAnswer;
    correctAnswerDiv.classList.add('visible');
  };


  // input container div

  // Function to highlight incorrect answers
  const highlightInputContainerOfIncorrectAnswer = (inputParentElement) => {
    inputParentElement.classList.add('incorrect');
  };

  // Function to highlight correct answers
  const highlightInputContainerOfCorrectAnswer = (inputParentElement) => {
    inputParentElement.classList.add('correct');
  };


  // answer validation

  // Logic to check if the user's answer is incorrect
  const answerIsIncorrect = (userAnswer) => {
    const correctAnswer = currentVerbToStudyDictionary[userAnswer.name]

    return userAnswer.value.trim().toLowerCase() !== correctAnswer;
  };

  // Function to validate the form inputs
  function validateForm() {
    const form = document.forms["verbForm"];
    Array.from(form.elements).forEach((input) => {
      setUserInputToNoAnswerGivenWhereBlank(input);
      console.log("input now = ", input)
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

  
  // Form Section Div

  function resetFormToOneSection() {
    setVisibleInputs([inputNames[0]]);// Start with first input visible
  }
  

  // Create the form

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
          {mapOfSubjectData.get("labelsMap")
              .filter(({ inputName }) => visibleInputs.includes(inputName))  // Only show visible inputs
              .map(({ inputName, label }) => (
            <FormSection 
              key={inputName} 
              inputName={inputName} 
              label={label} 
              onFocus={() => handleInputFocus(inputName)} 
            />
          ))}
            </div>
          <input type="submit" className="submitButton" id="submitButton" value={buttonText} />
        </form>
      </div>
    </div>
  );
}

export default Modal;
