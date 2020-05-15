import { AsyncStorage } from "react-native";

const FLASHCARDS_STORAGE_KEY = "Flashcards:data";

export const data = {
  TopicAA: {
    title: "TopicAA",
    questions: [
      {
        question: "Question 1",
        answer: "Answer 1",
      },
    ],
  },
  TopicBB: {
    title: "TopicBB",
    questions: [
      {
        question: "Question2 1",
        answer: "Answer2 1",
      },
    ],
  },
};

export function getData() {
  return data;
}

export async function getTopics() {
  try {
    const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
    if (results === null) {
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
    }
    return results === null ? data : JSON.parse(results);
  } catch (err) {
    console.log(err);
  }
}

function format(results) {
  return results === null ? data : JSON.parse(results);
}

export async function getTopic(id) {
  try {
    const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
    return JSON.parse(results)[id];
  } catch (err) {
    console.log(err);
  }
}

export async function saveTopicTitle(title) {
  try {
    await AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({ [title]: { title, questions: [] } })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function removeTopic(id) {
  try {
    const results = await AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY);
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[id];
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}

export async function addCardToTopic(topic, card) {
  try {
    const deck = await getDeck(topic);
    await AsyncStorage.mergeItem(
      FLASHCARDS_STORAGE_KEY,
      JSON.stringify({
        [topic]: { questions: [...deck.questions].concat(card) },
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export async function reset() {
  try {
    await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
  } catch (err) {
    console.log(err);
  }
}
