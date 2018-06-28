import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SPINNER_CHANGED
} from "../actions/types";

const INITSTATE = {
  email: "",
  password: "",
  user: null,
  error: "",
  loading: false
};

export default (state = INITSTATE, action) => {
  // console.log(action);
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_SUCCESS:
      return { ...state, ...INITSTATE, user: action.payload };
    case LOGIN_FAIL:
      return { ...state, error: "Authentication failed" };
    case SPINNER_CHANGED: {
      if (action.payload === "true") {
        return { ...state, loading: true, error:"" };
      } else {
        return { ...state, loading: false };
      }
    }
    default:
      return state;
  }
};
