import { SET_SUBJECTS, GET_SUBID, GET_SUBJECT } from "../Types";

const INITIAL_STATE = {
  subjects: null,
  subject: null,
  subId: null
};

function subjects(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload
      };
    case GET_SUBID:
      return {
        ...state,
        subId: action.payload
      };
    case GET_SUBJECT:
      return {
        ...state,
        subject: action.payload
      };
    default:
      return state;
  }
}

export default subjects;
