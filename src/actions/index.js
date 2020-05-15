import { getTopics } from "../utils/Api";
export const RECEIVED_TOPICS = "RECEIVED_TOPICS";
export const ADD_TOPIC = "ADD_TOPIC";
export const REMOVE_TOPIC = "REMOVE_TOPIC";
export const ADD_CARD = "ADD_CARD";
export const RESET_STORE = "RESET_STORE";

export function addTOPIC(title) {
  return {
    type: ADD_TOPIC,
    title,
  };
}

export function addCardToTOPIC(TOPICId, card) {
  return {
    type: ADD_CARD,
    TOPICId,
    card,
  };
}

export function receivedTOPICs(TOPICs) {
  return {
    type: RECEIVED_TOPICS,
    TOPICs,
  };
}

export function removeTOPIC(id) {
  return {
    type: REMOVE_TOPIC,
    id,
  };
}

export function resetStore() {
  return {
    type: RESET_STORE,
  };
}

export function handleInitialData() {
  return (dispatch) => {
    return getTopics().then((TOPICs) => {
      dispatch(receivedTOPICs(TOPICs));
    });
  };
}
