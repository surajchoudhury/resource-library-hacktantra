import users from "./users";
import mentors from "./mentors";
import subjects from "./subjects";
import modules from "./modules";
import urls from "./urls";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  users,
  mentors,
  subjects,
  modules,
  urls
});

export default rootReducer;
