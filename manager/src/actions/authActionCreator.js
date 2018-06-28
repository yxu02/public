import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SPINNER_CHANGED
} from "./types";
import firebase from "firebase";
import { Actions } from "react-native-router-flux";

export const emailChanged = text => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = text => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return async dispatch => {
    dispatch({ type: SPINNER_CHANGED, payload: "true" });
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      //with ReduxThunk, need to manually dispatch action after async func returns
      dispatch({ type: LOGIN_SUCCESS, payload: user });
      //Actions.employeeList(); //instead of nav to employeeList scene, nav to it's parent scene "main"
      Actions.main();
    } catch (e1) {
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        dispatch({ type: LOGIN_SUCCESS, payload: user });
        //Actions.employeeList(); //instead of nav to employeeList scene, nav to it's parent scene "main"
        Actions.main();
      } catch (e2) {
        dispatch({ type: LOGIN_FAIL });
      }
    } finally {
      dispatch({ type: SPINNER_CHANGED, payload: "false" });
    }
  };
};

