import { SET_MENTORS } from "../Types";

const INITIAL_STATE = {
  mentors: null
};

function mentors(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_MENTORS: {
      return {
        ...state,
        mentors: action.payload
      };
    }

    default:
      return state;
  }
}

export default mentors;
