import { SET_USERS, SET_MENTORS, SET_SUBJECTS, SET_MODULES } from "../Types";

function setUsers(payload) {
  return {
    Type: SET_USERS,
    payload
  };
}

function setMentors(payload) {
  return {
    Type: SET_MENTORS,
    payload
  };
}

function setSubjects(payload) {
  return {
    Type: SET_SUBJECTS,
    payload
  };
}

function setModules(payload) {
  return {
    Type: SET_MODULES,
    payload
  };
}

