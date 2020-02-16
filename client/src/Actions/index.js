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

export function fetchSubjects() {
  return dispatch => {
    fetch("/api/v1/subjects", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(subject => {
        console.log(subject);
        if (subject.success) {
        }
      });
  };
}

export function loginUser(username, password) {
  return dispatch => {
    fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: {
        username,
        password
      }
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          localStorage.setItem("token", user.token);
        }
      });
  };
}
