import { SET_URLS } from "../Types";

const INITIAL_STATE = {
  urls: null
};

function Urls(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_URLS:
      return {
        ...state,
        urls: action.payload
      };
    default:
      return state;
  }
}

export default Urls;
