import { getByRole } from "@testing-library/dom";
import Modal from "../Components/Modal";
import { render, screen } from "@testing-library/react";

// const mockData = new Map([
//     ["labelsAsArray", ["ich", "du", "er", "wir", "ihr", "sie"]],
//     ["type", "verbTense"],
//     ["wordsToStudyArray", ["essen", "trinken", "gehen", "sehen", "kommen", "machen", "fahren", "arbeiten", "lesen", "sprechen"]],
//     ["subjectToBeStudied", "present"],
//     ["numberOfVerbsToStudy", 2],
//     ["labelsMap", [
//         { inputName: "ich", label: "ich" },
//         { inputName: "du", label: "du" },
//         { inputName: "er", label: "er / sie / es" },
//         { inputName: "wir", label: "wir" },
//         { inputName: "ihr", label: "ihr" },
//         { inputName: "sie", label: "sie / Sie" }
//     ]]
//   ]);

test('renders with correct title', () => {
    render(<Modal title="Present" onClose={() => {}} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Present Tense");    }
);

test('renders with correct subtitle', () => {
    render(<Modal title="Present" onClose={() => {}} />);
    const currentWord = screen.getByRole("heading", { level: 3 });
    expect(currentWord).toHaveTextContent("essen");    
} 
);