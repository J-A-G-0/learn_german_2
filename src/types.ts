export type SubjectToBeStudied = "present" | "perfekt";

export type GrammarType = "verbTense";

export interface LabelItem {
  inputName: string;
  label: string;
}

export interface QuizData {
  subjectToBeStudied: SubjectToBeStudied;
  grammarType: GrammarType;
  wordsToStudy: string[];
  numberOfWordsToStudy: number;
  labelsMap: LabelItem[];
  labelsAsArray: string[];
}