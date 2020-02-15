import { SET_MODULES } from "../Types";

function setModules(payload) {
  return {
    Type: SET_MODULES,
    payload
  };
}

