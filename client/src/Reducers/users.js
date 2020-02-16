import { SET_USERS, SET_USER, IS_LOGGED } from "../Types";

const INITIAL_STATE = {
  users: null,
  user: null,
  isLogged: false
};

function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case IS_LOGGED:
      return {
        ...state,
        isLogged: action.payload
      };

    default:
      return state;
  }
}

export default users;
