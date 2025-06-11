import QuizForm from "../Components/QuizForm";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mocking dependencies
const setUserInputToNoAnswerGivenWhereBlank = jest.fn();
const answerIsIncorrect = jest.fn();
const highlightInputContainerOfIncorrectAnswer = jest.fn();
const revealCorrectAnswer = jest.fn();
const highlightUsersWrongInputText = jest.fn();
const highlightInputContainerOfCorrectAnswer = jest.fn();

const mockMapOfSubjectData = new Map([
    ["labelsAsArray", ["ich", "du", "er", "wir", "ihr", "sie"]],
    ["type", "verbTense"],
    ["wordsToStudyArray", ["essen", "trinken", "gehen", "sehen", "kommen", "machen", "fahren", "arbeiten", "lesen", "sprechen"]],
    ["subjectToBeStudied", "present"],
    ["numberOfVerbsToStudy", 10],
    ["labelsMap", [
        { inputName: "ich", label: "ich" },
        { inputName: "du", label: "du" },
        { inputName: "er", label: "er / sie / es" },
        { inputName: "wir", label: "wir" },
        { inputName: "ihr", label: "ihr" },
        { inputName: "sie", label: "sie / Sie" }
    ]]
  ]);


test("validateForm is triggered on form submission", () => {
    render(<QuizForm mapOfSubjectData={mockMapOfSubjectData} verbNumber={0} setVerbNumber={jest.fn()} onClose={jest.fn()} />);
  
    const form = screen.getByRole("form");  
    fireEvent.submit(form);
  
    expect(setUserInputToNoAnswerGivenWhereBlank).toHaveBeenCalled();
  });
  
