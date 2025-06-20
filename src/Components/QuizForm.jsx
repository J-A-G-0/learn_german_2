import React, { useState, useEffect } from "react";
import FormSection from "./FormSection";
import verbs from "../Data/Verbs";

function QuizForm({ quizData, verbNumber, setVerbNumber, onClose }) {
  const [submitCount, setSubmitCount] = useState(0);
  const [buttonText, setButtonText] = useState("Check Answers");
  const [inputNames] = useState(quizData.labelsAsArray);
  const [visibleInputs, setVisibleInputs] = useState([inputNames[0]]);

  const currentVerb = quizData.wordsToStudy[verbNumber];
  const currentVerbDict = verbs[currentVerb][quizData.subjectToBeStudied];

  // Reset form state when verbNumber changes
  useEffect(() => {
    setSubmitCount(0);
    setButtonText("Check Answers");
    setVisibleInputs([inputNames[0]]);
    resetInputs();
    resetFloatingLabels();
    resetCorrectAnswers();
    resetInputTextColour();
  }, [verbNumber]);

  // Floating labels setup
  useEffect(() => {
    const inputAreas = document.querySelectorAll('.inputArea');

    inputAreas.forEach((input) => {
      const label = input.nextElementSibling;

      input.addEventListener("focus", () => label.classList.add('active'));
      input.addEventListener("blur", () => {
        if (!input.value.trim()) {
          label.classList.remove('active');
        }
      });

      if (input.value.trim()) {
        label.classList.add('active');
      }
    });

    return () => {
      inputAreas.forEach((input) => {
        const label = input.nextElementSibling;
        input.removeEventListener("focus", () => label.classList.add('active'));
        input.removeEventListener("blur", () => {
          if (!input.value.trim()) {
            label.classList.remove('active');
          }
        });
      });
    };
  }, [visibleInputs]);

  function handleSubmit(event) {
    event.preventDefault();

    if (submitCount === 0) {
      validateForm(event.target);
      setButtonText("Continue");
      lockInputs();
      floatAllLabels();
      setSubmitCount(1);
    } else if (submitCount === 1) {
      if (verbNumber < quizData.numberOfWordsToStudy - 1) {
        setVerbNumber((prev) => prev + 1);
      } else {
        onClose();
      }
    }
  }

  // --- Helpers ---

  function validateForm(form) {
    Array.from(form.elements).forEach((input) => {
      if (input.type !== "submit") {
        setUserInputToNoAnswerGivenWhereBlank(input);

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

  function answerIsIncorrect(input) {
    return input.value.trim().toLowerCase() !== currentVerbDict[input.name];
  }

  function revealCorrectAnswer(input) {
    const correctAnswer = currentVerbDict[input.name];
    const correctAnswerDiv = document.getElementById("correct-answer-" + input.name);
    if (correctAnswerDiv) {
      correctAnswerDiv.textContent = correctAnswer;
      correctAnswerDiv.classList.add("visible");
    }
  }

  function lockInputs() {
    document.querySelectorAll("#quizForm input").forEach((input) => {
      if (input.type !== "submit") input.disabled = true;
    });
  }

  function floatAllLabels() {
    document.querySelectorAll(".inputArea").forEach((input) => {
      const label = input.nextElementSibling;
      label.classList.add("active");
    });
  }

  function resetFloatingLabels() {
    document.querySelectorAll(".inputArea").forEach((input) => {
      const label = input.nextElementSibling;
      if (!input.value.trim()) label.classList.remove("active");
    });
  }

  function resetInputs() {
    document.querySelectorAll("#quizForm input").forEach((input) => {
      input.disabled = false;
      input.parentElement.classList.remove("correct", "incorrect");
      if (input.type !== "submit") input.value = "";
    });
  }

  function resetInputTextColour() {
    document.querySelectorAll("#quizForm input").forEach((input) => {
      input.classList.remove("incorrect");
    });
  }

  function resetCorrectAnswers() {
    document.querySelectorAll("#quizForm .correct-answer").forEach((div) => {
      div.classList.remove("visible");
    });
  }

  function highlightInputContainerOfIncorrectAnswer(container) {
    container.classList.add("incorrect");
  }

  function highlightInputContainerOfCorrectAnswer(container) {
    container.classList.add("correct");
  }

  function highlightUsersWrongInputText(input) {
    input.classList.add("incorrect");
  }

  function setUserInputToNoAnswerGivenWhereBlank(input) {
    if (!input.value.trim()) {
      input.value = "No Answer Given";
    }
  }

  function handleInputFocus(inputName) {
    const currentIndex = inputNames.indexOf(inputName);
    const nextIndex = currentIndex + 1;

    if (nextIndex < inputNames.length) {
      setVisibleInputs((prev) => [...prev, inputNames[nextIndex]]);
    }

    setTimeout(() => {
      document.querySelectorAll('.inputArea').forEach((input) => {
        const label = input.nextElementSibling;
        if (input.value.trim()) label.classList.add('active');
      });
    }, 50);
  }

  // --- Render ---

  return (
    <form id="quizForm" name="quizForm" onSubmit={handleSubmit}>
      <div className="form-group">
        {quizData.labelsMap
          .filter(({ inputName }) => visibleInputs.includes(inputName))
          .map(({ inputName, label }) => (
            <FormSection
              key={inputName}
              inputName={inputName}
              label={label}
              onFocus={() => handleInputFocus(inputName)}
            />
          ))}
      </div>
      <input type="submit" className="submitButton" value={buttonText} />
    </form>
  );
}

export default QuizForm;
