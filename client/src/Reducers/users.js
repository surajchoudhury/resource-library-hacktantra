import { SET_USERS } from "../Types";

const INITIAL_STATE = {
  users: null
};

function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      };
    default:
      return state;
  }
}

export default users;
