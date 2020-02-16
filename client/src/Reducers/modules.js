import { SET_MODULES, GET_MODULE } from "../Types";

const INITIAL_STATE = {
  modules: null,
  module: null
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
    default:
      return state;
  }
}

export default modules;
