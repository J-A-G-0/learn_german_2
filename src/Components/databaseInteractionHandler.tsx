// Receive a tense name and return a map of this format:

/* Map:
"subjectToBeStudied" : "present",
"grammarType" : "verbTense",
"wordsToStudy" : ["essen", "trinken", etc],
"numberOfVerbsToStudy" : 10,
"labelsMap" : { inputName: "ich", label: "ich" }, { inputName: "du", label: "du" }, etc
"labelsAsArray" : ["ich", "du", etc]
*/


import { SubjectToBeStudied, QuizData, GrammarType, LabelItem } from "../types";

export function getQuizData(subjectToBeStudied : SubjectToBeStudied): QuizData {
    const wordsToStudy = getWordsToStudyArray(subjectToBeStudied);
    const grammarType = getGrammarTypeOfSubjectToBeStudied(subjectToBeStudied);
    const labelsMap = getLabelsMapFromGrammarType(grammarType);

    const quizData: QuizData = {
        subjectToBeStudied,
        grammarType,
        wordsToStudy: wordsToStudy,
        numberOfWordsToStudy: wordsToStudy.length,
        labelsMap,
        labelsAsArray: getLabelsAsArray(labelsMap)
    }

    console.log("map of subject data = ", quizData);
    console.log("type = ", grammarType);
    console.log("labelsMap = ", labelsMap);
    return quizData;
}

// Return the array of words to be studied. 
function getWordsToStudyArray(subjectToBeStudied : SubjectToBeStudied): string[] {
    const subjectToWordArrayMap: Record<SubjectToBeStudied, string[]> =  {
        present: ["essen", "trinken", "gehen", "sehen", "kommen", "machen", "fahren", "arbeiten", "lesen", "sprechen"],
        perfekt: ["essen", "trinken", "gehen", "sehen", "kommen", "machen", "fahren", "arbeiten", "lesen", "sprechen"]
    };

    return subjectToWordArrayMap[subjectToBeStudied];
}

// Return the 'grammarType' of the subject to be studied, e.g. "verb", "article", etc
function getGrammarTypeOfSubjectToBeStudied(subjectToBeStudied : SubjectToBeStudied): GrammarType {

    const subjectTypeMap: Record<GrammarType, SubjectToBeStudied[]> = {
        verbTense: ["present", "perfekt"]
        // Add more categories in the future
      };

    for (const [type, values] of Object.entries(subjectTypeMap) as [GrammarType, SubjectToBeStudied[]][]) {
        if (values.includes(subjectToBeStudied)) {
            return type;
        }
    }

    throw new Error(`Invalid subjectToBeStudied: no matching grammarType found for "${subjectToBeStudied}".`);
}

// Return the map of labels for this type. This wil give us the pronouns if a verb, and their label. 
function getLabelsMapFromGrammarType(grammarType : GrammarType): LabelItem[] {
    const verbTenseLabelsMap: LabelItem[] = [
    { inputName: "ich", label: "ich" },
    { inputName: "du", label: "du" },
    { inputName: "er", label: "er / sie / es" },
    { inputName: "wir", label: "wir" },
    { inputName: "ihr", label: "ihr" },
    { inputName: "sie", label: "sie / Sie" }
    ];
  const typeToMapPairs: Record<GrammarType, LabelItem[]> = {
    verbTense: verbTenseLabelsMap
  };

  return typeToMapPairs[grammarType];
}

function getLabelsAsArray(labelsMap: LabelItem[]): string[] {
    return labelsMap.map(item => item.inputName);
};


export default getQuizData;
