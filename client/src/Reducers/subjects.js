import { SET_SUBJECTS } from "../Types";

const INITIAL_STATE = {
  subjects: null
};

function subjects(state = INITIAL_STATE, action) {
  switch (action.payload) {
    case SET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload
      };

    default:
      return state;
  }
}

export default subjects;
