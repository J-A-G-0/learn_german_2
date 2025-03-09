import React from 'react';

export function getVerbArrayFromTenseName(tense) {
    const tenseToVerbArrayMap = new Map([
        ["present", ["essen", "trinken", "gehen", "sehen", "kommen", "machen", "fahren", "arbeiten", "lesen", "sprechen"]]
    ]);

    return tenseToVerbArrayMap.get(tense);
}

// Remember to feed this just the value, not the object. 
export default function verbHashes(tense) {
    const presentTense = {
        "essen": {
          "ich": "esse",
          "du": "isst",
          "er": "isst",
          "wir": "essen",
          "ihr": "esst",
          "sie": "essen"
        },
        "trinken": {
          "ich": "trinke",
          "du": "trinkst",
          "er": "trinkt",
          "wir": "trinken",
          "ihr": "trinkt",
          "sie": "trinken"
        },
        "gehen": {
          "ich": "gehe",
          "du": "gehst",
          "er": "geht",
          "wir": "gehen",
          "ihr": "geht",
          "sie": "gehen"
        },
        "sehen": {
          "ich": "sehe",
          "du": "siehst",
          "er": "sieht",
          "wir": "sehen",
          "ihr": "seht",
          "sie": "sehen"
        },
        "kommen": {
          "ich": "komme",
          "du": "kommst",
          "er": "kommt",
          "wir": "kommen",
          "ihr": "kommt",
          "sie": "kommen"
        },
        "machen": {
          "ich": "mache",
          "du": "machst",
          "er": "macht",
          "wir": "machen",
          "ihr": "macht",
          "sie": "machen"
        },
        "fahren": {
          "ich": "fahre",
          "du": "fährst",
          "er": "fährt",
          "wir": "fahren",
          "ihr": "fahrt",
          "sie": "fahren"
        },
        "arbeiten": {
          "ich": "arbeite",
          "du": "arbeitest",
          "er": "arbeitet",
          "wir": "arbeiten",
          "ihr": "arbeitet",
          "sie": "arbeiten"
        },
        "lesen": {
          "ich": "lese",
          "du": "liest",
          "er": "liest",
          "wir": "lesen",
          "ihr": "lest",
          "sie": "lesen"
        },
        "sprechen": {
          "ich": "spreche",
          "du": "sprichst",
          "er": "spricht",
          "wir": "sprechen",
          "ihr": "sprecht",
          "sie": "sprechen"
        }
      };

    const pairings  = new Map([
        ["present", presentTense]
    ]);

    return pairings.get(tense);
       
}