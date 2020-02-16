import {
  SET_USERS,
  SET_USER,
  SET_MENTORS,
  SET_SUBJECTS,
  SET_MODULES,
  IS_LOGGED,
  GET_SUBID
} from "../Types";

function setUsers(payload) {
  return {
    type: SET_USERS,
    payload
  };
}

function setMentors(payload) {
  return {
    type: SET_MENTORS,
    payload
  };
}

function setSubjects(payload) {
  return {
    type: SET_SUBJECTS,
    payload
  };
}

function setModules(payload) {
  return {
    type: SET_MODULES,
    payload
  };
}

function setUser(payload) {
  return {
    type: SET_USER,
    payload
  };
}

export function isLogged(payload) {
  return {
    type: IS_LOGGED,
    payload
  };
}

export function setSubId(payload) {
  return {
    type: GET_SUBID,
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
        if (subject.success) {
          dispatch(setSubjects(subject));
        }
      });
  };
}

export function createSubject(title, description, image, history) {
  return dispatch => {
    fetch("/api/v1/subjects", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        title,
        description,
        image
      })
    })
      .then(res => res.json())
      .then(subject => {
        if (subject.success) {
          history.push("/");
          dispatch(fetchSubjects());
        }
      });
  };
}

export function deleteSubject(id) {
  return dispatch => {
    fetch(`/api/v1/subjects/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(subject => {
        if (subject.success) {
          dispatch(fetchSubjects());
        }
      });
  };
}

export function createModule(id, title, description, body, image) {
  return dispatch => {
    fetch(`/api/v1/subjects/${id}/modules`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        title,
        description,
        body,
        image
      })
    })
      .then(res => res.json())
      .then(modules => {
        if (modules.success) {
          dispatch(fetchSubjects());
        }
      });
  };
}

export function loginUser(username, password, history) {
  return dispatch => {
    fetch("/api/v1/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          localStorage.setItem("token", user.token);
          dispatch(isLogged(true));
          history.push("/");
        }
      });
  };
}

export function fetchUser() {
  return dispatch => {
    fetch("/api/v1/users", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          dispatch(isLogged(true));
          dispatch(setUser(user));
        }
      });
  };
}
