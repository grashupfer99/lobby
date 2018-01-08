import axios from "axios";

const BASE_URL = `/api`;

const client = axios.create({
  baseURL: BASE_URL,
  responseType: "json"
});

export default client;

export const login = (login, password) => ({
  type: "LOGIN",
  payload: {
    request: {
      method: "POST",
      url: "/login",
      data: {
        login,
        password
      }
    }
  }
});

export const register = (user, userSkills) => ({
  type: "REGISTER",
  payload: {
    request: {
      method: "POST",
      url: "/register",
      data: {
        user,
        userSkills
      }
    }
  }
});

export const updateUser = (user) => ({
  type: "USER_UPDATE",
  payload: {
    request: {
      method: "POST",
      url: "/user/update",
      data: {
        user
      }
    }
  }
});

export const createThesis = (thesis, roles) => ({
  type: "THESIS_CREATE",
  payload: {
    request: {
      method: "POST",
      url: "/thesis",
      data: {
        thesis,
        roles
      }
    }
  }
});

export const getBranches = userLogin => ({
  type: "GET_BRANCHES",
  payload: {
    request: {
      method: "GET",
      url: `/user/branches?userLogin=${userLogin}`
    }
  }
});

export const getTheses = userLogin => ({
  type: "GET_THESES",
  payload: {
    request: {
      method: "GET",
      url: `/user/theses?userLogin=${userLogin}`
    }
  }
});
