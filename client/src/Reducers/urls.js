import { SET_URLS, SET_URLID } from "../Types";

const INITIAL_STATE = {
  urls: null,
  urlId: null
};

function Urls(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_URLS:
      return {
        ...state,
        urls: action.payload
      };
    case SET_URLID:
      return {
        ...state,
        urlId: action.payload
      };
    default:
      return state;
  }
}

export default Urls;
