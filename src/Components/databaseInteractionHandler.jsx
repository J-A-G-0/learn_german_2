// Receive a tense name and return a map of this format:

/* Map:
"subjectToBeStudied" : "present",
"type" : "verbTense",
"wordsToStudyArray" : ["essen", "trinken", etc],
"numberOfVerbsToStudy" : 10,
"labelsMap" : { inputName: "ich", label: "ich" }, { inputName: "du", label: "du" }, etc
"labelsAsArray" : ["ich", "du", etc]
*/

export function getMapOfSubjectData(subjectToBeStudied) {
    subjectToBeStudied = subjectToBeStudied.toLowerCase();

    const wordsToStudyArray = getWordsToStudyArray(subjectToBeStudied);
    const type = getTypeOfSubjectToBeStudied(subjectToBeStudied);
    const labelsMap = getLabelsMapFromType(type);

    const mapOfSubjectData = new Map([
        ["subjectToBeStudied", subjectToBeStudied],
        ["type", type], // e.g. "verb", "article"
        ["wordsToStudyArray", wordsToStudyArray],
        ["numberOfVerbsToStudy", wordsToStudyArray.length],
        ["labelsMap", labelsMap],
        ["labelsAsArray", getLabelsAsArray(labelsMap)]
    ]);

    console.log("map of subject data = ", mapOfSubjectData);
    console.log("type = ", type);
    console.log("labelsMap = ", labelsMap);
    return mapOfSubjectData;
}

// Return the array of words to be studied. 
function getWordsToStudyArray(subjectToBeStudied) {
    const subjectToWordArrayMap = {
        present: ["essen", "trinken", "gehen", "sehen", "kommen", "machen", "fahren", "arbeiten", "lesen", "sprechen"],
        perfekt: ["essen", "trinken", "gehen", "sehen", "kommen", "machen", "fahren", "arbeiten", "lesen", "sprechen"]
    };

    return subjectToWordArrayMap[subjectToBeStudied] || [];}

// Return the 'type' of the subject to be studied, e.g. "verb", "article", etc
function getTypeOfSubjectToBeStudied(subjectToBeStudied) {
    const subjectTypeMap = {
        verbTense: ["present", "perfekt"]
        // Add more categories in the future
      };

    for (const [type, values] of Object.entries(subjectTypeMap)) {
    if (values.includes(subjectToBeStudied)) {
        return type; // Return the category (e.g., 'verbTense')
    }
    }

    return null; // Return null if not found
}

// Return the map of labels for this type. This wil give us the pronouns if a verb, and their label. 
function getLabelsMapFromType(type) {
    const verbTenseLabelsMap = [
        { inputName: "ich", label: "ich" },
        { inputName: "du", label: "du" },
        { inputName: "er", label: "er / sie / es" },
        { inputName: "wir", label: "wir" },
        { inputName: "ihr", label: "ihr" },
        { inputName: "sie", label: "sie / Sie" }
    ];
    // In future add separate articlesLabelsMap etc. 

    const typeToMapPairs = {
        verbTense: verbTenseLabelsMap
    };

    return typeToMapPairs[type] || [];
};

const getLabelsAsArray = (labelsMap) => {
    return labelsMap.map(item => item.inputName);
};


export default getMapOfSubjectData;
