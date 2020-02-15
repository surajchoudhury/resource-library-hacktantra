import users from "./users";
import mentors from "./mentors";
import subjects from "./subjects";
import modules from "./subjects";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users,
  mentors,
  subjects,
  modules
});

export default rootReducer;
