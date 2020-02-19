import { SET_MODULES, GET_MODULE, GET_CHAPTER } from "../Types";

const INITIAL_STATE = {
  modules: null,
  module: null,
  chapter: null
};

function modules(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_MODULES:
      return {
        ...state,
        modules: action.payload
      };
    case GET_MODULE:
      return {
        ...state,
        module: action.payload
      };

    case GET_CHAPTER:
      return {
        ...state,
        chapter: action.payload
      };
    default:
      return state;
  }
}

export default modules;
