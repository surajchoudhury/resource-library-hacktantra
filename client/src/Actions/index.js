import {
  SET_USERS,
  SET_USER,
  SET_MENTORS,
  SET_SUBJECTS,
  SET_MODULES,
  IS_LOGGED,
  GET_SUBID,
  GET_SUBJECT,
  GET_MODULE,
  GET_CHAPTER,
  SET_URLS,
  SET_URLID
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

function setUrls(payload) {
  return {
    type: SET_URLS,
    payload
  };
}

export function setUrlId(payload) {
  return {
    type: SET_URLID,
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

function setSubject(payload) {
  return {
    type: GET_SUBJECT,
    payload
  };
}

function setModule(payload) {
  return {
    type: GET_MODULE,
    payload
  };
}

function setChapter(payload) {
  return {
    type: GET_CHAPTER,
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

export function fetchUrls() {
  return dispatch => {
    fetch("/api/v1/url", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(urls => {
        if (urls.success) {
          dispatch(setUrls(urls));
        }
      });
  };
}

export function createUrl(title, body, history) {
  return dispatch => {
    fetch("/api/v1/url", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        title,
        body
      })
    })
      .then(res => res.json())
      .then(url => {
        if (url.success) {
          dispatch(fetchUrls());
          history.push("/urls");
        }
      });
  };
}

export function updateUrl(id, title, body, history) {
  return dispatch => {
    fetch(`/api/v1/url/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        title,
        body
      })
    })
      .then(res => res.json())
      .then(url => {
        if (url.success) {
          dispatch(fetchUrls());
          history.push("/urls");
        }
      });
  };
}

export function deleteUrl(id) {
  return dispatch => {
    fetch(`/api/v1/url/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(url => {
        if (url.success) {
          dispatch(fetchUrls());
        }
      });
  };
}

export function createLink(id, body) {
  return dispatch => {
    fetch(`/api/v1/url/${id}/links`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        body
      })
    })
      .then(res => res.json())
      .then(link => {
        if (link.success) {
          dispatch(fetchUrls());
        }
      });
  };
}

export function deleteLink(id, linkId) {
  return dispatch => {
    fetch(`/api/v1/url/${id}/links/${linkId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(link => {
        if (link.success) {
          dispatch(fetchUrls());
        }
      });
  };
}

export function createSubject(title, description, image) {
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
          window.location.reload(false);
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

export function fetchSubject(id) {
  return dispatch => {
    fetch(`/api/v1/subjects/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(subject => {
        if (subject.success) {
          dispatch(setSubject(subject));
        }
      });
  };
}

export function fetchModules(id) {
  return dispatch => {
    fetch(`/api/v1/subjects/${id}/modules`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(modules => {
        if (modules.success) {
          dispatch(setModules(modules));
        }
      });
  };
}

export function createModule(id, title, description, body, faq, history) {
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
        faq
      })
    })
      .then(res => res.json())
      .then(modules => {
        if (modules.success) {
          dispatch(fetchSubject(id));
          history.push(`/modules/${"=" + id}`);
        }
      });
  };
}

export function fetchModule(id, moduleID) {
  return dispatch => {
    fetch(`/api/v1/subjects/${id}/modules/${moduleID}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(Module => {
        if (Module.success) {
          dispatch(setModule(Module));
        }
      });
  };
}

export function updateModule(id, moduleID, title, description, body, history) {
  console.log("point 1");
  return dispatch => {
    fetch(`/api/v1/subjects/${id}/modules/${moduleID}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.token
      },
      body: JSON.stringify({
        title,
        description,
        body
      })
    })
      .then(res => res.json())
      .then(modules => {
        if (modules.success) {
          history.push(`/modules/${"=" + id}`);
          dispatch(fetchModule(id, moduleID));
          dispatch(fetchSubject(id));
          dispatch(fetchSubjects());
        }
      });
  };
}

export function deleteModule(id, moduleID) {
  return dispatch => {
    fetch(`/api/v1/subjects/${id}/modules/${moduleID}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(Module => {
        if (Module.success) {
          dispatch(fetchSubjects());
          dispatch(fetchSubject(id));
          window.location.reload(false);
        }
      });
  };
}

export function fetchChapter(subid, modid, chapid) {
  return dispatch => {
    fetch(`/api/v1/subjects/${subid}/modules/${modid}/chapters/${chapid}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(chapter => {
        if (chapter.success) {
          dispatch(setChapter(chapter));
        }
      });
  };
}

export function createChapter(subid, modid, title, description, body, history) {
  return dispatch => {
    fetch(`/api/v1/subjects/${subid}/modules/${modid}/chapters`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({
        title,
        description,
        body
      })
    })
      .then(res => res.json())
      .then(modules => {
        if (modules.success) {
          dispatch(fetchSubject(subid));
          dispatch(fetchModule(subid, modid));
          history.push(`/modules/${"=" + subid}`);
        }
      });
  };
}

export function updateChapter(
  subid,
  moduleID,
  chapterID,
  title,
  description,
  body,
  history
) {
  return dispatch => {
    fetch(
      `/api/v1/subjects/${subid}/modules/${moduleID}/chapters/${chapterID}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token
        },
        body: JSON.stringify({
          title,
          description,
          body
        })
      }
    )
      .then(res => res.json())
      .then(chapter => {
        if (chapter.success) {
          history.push(`/modules/${"=" + subid}`);
          dispatch(fetchSubject(subid));
          dispatch(fetchChapter(subid, moduleID, chapterID));
        }
      });
  };
}

export function deleteChapter(subid, modid, chapid) {
  return dispatch => {
    fetch(`/api/v1/subjects/${subid}/modules/${modid}/chapters/${chapid}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(chapter => {
        if (chapter.success) {
          window.location.reload(false);
          dispatch(fetchSubject(subid));
        }
      });
  };
}

export function signupUser(username, email, password, history) {
  return dispatch => {
    fetch("/api/v1/users/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user.success) {
          history.push("/");
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
