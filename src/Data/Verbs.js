export function getVerbArrayFromTenseName(tense) {
    const tenseToVerbArrayMap = new Map([
        ["present", ["essen", "trinken", "gehen", "sehen", "kommen", "machen", "fahren", "arbeiten", "lesen", "sprechen"]],
        ["perfekt", ["essen", "trinken", "gehen", "sehen", "kommen", "machen", "fahren", "arbeiten", "lesen", "sprechen"]]
    ]);

    return tenseToVerbArrayMap.get(tense.toLowerCase());
}

const verbs = {
    "essen": {
        "present": {
            "ich": "esse",
            "du": "isst",
            "er": "isst",
            "wir": "essen",
            "ihr": "esst",
            "sie": "essen"
        },
        "perfekt": {
            "ich": "habe gegessen",
            "du": "hast gegessen",
            "er": "hat gegessen",
            "wir": "haben gegessen",
            "ihr": "habt gegessen",
            "sie": "haben gegessen"
        }
    },
    "trinken": {
        "present": {
            "ich": "trinke",
            "du": "trinkst",
            "er": "trinkt",
            "wir": "trinken",
            "ihr": "trinkt",
            "sie": "trinken"
        },
        "perfekt": {
            "ich": "habe getrunken",
            "du": "hast getrunken",
            "er": "hat getrunken",
            "wir": "haben getrunken",
            "ihr": "habt getrunken",
            "sie": "haben getrunken"
        }
    },
    "gehen": {
        "present": {
            "ich": "gehe",
            "du": "gehst",
            "er": "geht",
            "wir": "gehen",
            "ihr": "geht",
            "sie": "gehen"
        },
        "perfekt": {
            "ich": "bin gegangen",
            "du": "bist gegangen",
            "er": "ist gegangen",
            "wir": "sind gegangen",
            "ihr": "seid gegangen",
            "sie": "sind gegangen"
        }
    },
    "sehen": {
        "present": {
            "ich": "sehe",
            "du": "siehst",
            "er": "sieht",
            "wir": "sehen",
            "ihr": "seht",
            "sie": "sehen"
        },
        "perfekt": {
            "ich": "habe gesehen",
            "du": "hast gesehen",
            "er": "hat gesehen",
            "wir": "haben gesehen",
            "ihr": "habt gesehen",
            "sie": "haben gesehen"
        }
    },
    "kommen": {
        "present": {
            "ich": "komme",
            "du": "kommst",
            "er": "kommt",
            "wir": "kommen",
            "ihr": "kommt",
            "sie": "kommen"
        },
        "perfekt": {
            "ich": "bin gekommen",
            "du": "bist gekommen",
            "er": "ist gekommen",
            "wir": "sind gekommen",
            "ihr": "seid gekommen",
            "sie": "sind gekommen"
        }
    },
    "machen": {
        "present": {
            "ich": "mache",
            "du": "machst",
            "er": "macht",
            "wir": "machen",
            "ihr": "macht",
            "sie": "machen"
        },
        "perfekt": {
            "ich": "habe gemacht",
            "du": "hast gemacht",
            "er": "hat gemacht",
            "wir": "haben gemacht",
            "ihr": "habt gemacht",
            "sie": "haben gemacht"
        }
    },
    "fahren": {
        "present": {
            "ich": "fahre",
            "du": "fährst",
            "er": "fährt",
            "wir": "fahren",
            "ihr": "fahrt",
            "sie": "fahren"
        },
        "perfekt": {
            "ich": "bin gefahren",
            "du": "bist gefahren",
            "er": "ist gefahren",
            "wir": "sind gefahren",
            "ihr": "seid gefahren",
            "sie": "sind gefahren"
        }
    },
    "arbeiten": {
        "present": {
            "ich": "arbeite",
            "du": "arbeitest",
            "er": "arbeitet",
            "wir": "arbeiten",
            "ihr": "arbeitet",
            "sie": "arbeiten"
        },
        "perfekt": {
            "ich": "habe gearbeitet",
            "du": "hast gearbeitet",
            "er": "hat gearbeitet",
            "wir": "haben gearbeitet",
            "ihr": "habt gearbeitet",
            "sie": "haben gearbeitet"
        }
    },
    "lesen": {
        "present": {
            "ich": "lese",
            "du": "liest",
            "er": "liest",
            "wir": "lesen",
            "ihr": "lest",
            "sie": "lesen"
        },
        "perfekt": {
            "ich": "habe gelesen",
            "du": "hast gelesen",
            "er": "hat gelesen",
            "wir": "haben gelesen",
            "ihr": "habt gelesen",
            "sie": "haben gelesen"
        }
    },
    "sprechen": {
        "present": {
            "ich": "spreche",
            "du": "sprichst",
            "er": "spricht",
            "wir": "sprechen",
            "ihr": "sprecht",
            "sie": "sprechen"
        },
        "perfekt": {
            "ich": "habe gesprochen",
            "du": "hast gesprochen",
            "er": "hat gesprochen",
            "wir": "haben gesprochen",
            "ihr": "habt gesprochen",
            "sie": "haben gesprochen"
        }
    }
};

export default verbs;