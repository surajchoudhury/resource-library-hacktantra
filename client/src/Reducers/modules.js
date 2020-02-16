import { SET_MODULES } from "../Types";

const INITIAL_STATE = {
  modules: null
};

function modules(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_MODULES:
      return {
        ...state,
        modules: action.payload
      };

    default:
      return state;
  }
}

export default modules;
