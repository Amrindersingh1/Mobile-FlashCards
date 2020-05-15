import {
  ADD_CARD,
  ADD_TOPIC,
  RECEIVED_TOPICS,
  RESET_STORE,
  REMOVE_TOPIC,
} from "../actions/index";

import { data as INITIAL_STATE } from "../utils/Api";

export default function TOPICs(state = {}, action) {
  switch (action.type) {
    case RECEIVED_TOPICS:
      return {
        ...state,
        ...action.TOPICs,
      };
    case ADD_TOPIC:
      const { title } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: [],
        },
      };
    case REMOVE_TOPIC:
      const { id } = action;
      const { [id]: value, ...remainingTOPICs } = state;
      return remainingTOPICs;
    case ADD_CARD:
      const { TOPICId, card } = action;
      return {
        ...state,
        [TOPICId]: {
          ...state[TOPICId],
          questions: [...state[TOPICId].questions].concat(card),
        },
      };
    case RESET_STORE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
