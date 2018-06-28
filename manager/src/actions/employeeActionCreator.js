import { EMPLOYEE_UPDATE, EMPLOYEE_CREATE, EMPLOYEES_FETCH_SUCCESS } from "./types";
import firebase from "firebase";
import {Actions} from 'react-native-router-flux';

export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

export const employeeCreation = ({ name, phone, shift }) => {
  return async (dispatch) => {
    const {currentUser} = firebase.auth();
    try {
      await firebase.database()
        .ref(`/users/${currentUser.uid}/employees`)
        .push({name, phone, shift});
    } catch (e) {
      console.log(e.message);
    } finally {
      dispatch({type:EMPLOYEE_CREATE});
      //nav back to previous window and remove the top stack nav
      Actions.pop();
    }
  };
};

export const employeePatch = ({ name, phone, shift, uid }) => {
  return async (dispatch) => {
    const {currentUser} = firebase.auth();
    try {
      await firebase.database()
        .ref(`/users/${currentUser.uid}/employees/${uid}`)
        .set({name, phone, shift});
    } catch (e) {
      console.log(e.message);
    } finally {
      dispatch({type:EMPLOYEE_CREATE});
      //nav back to previous window and remove the top stack nav
      Actions.pop();
    }
  };
};

export const employeeDelete = ({ uid }) => {
  return async () => {
    const {currentUser} = firebase.auth();
    try {
      await firebase.database()
        .ref(`/users/${currentUser.uid}/employees/${uid}`)
        .remove();
    } catch (e) {
      console.log(e.message);
    } finally {
      //nav back to previous window and remove the top stack nav
      Actions.main({type:'reset'});
    }
  };
};

export const employeesFetch = () =>{
  return async (dispatch) =>{
    const {currentUser} = firebase.auth();
    await firebase.database()
      .ref(`/users/${currentUser.uid}/employees`)
      //.on() will keep monitor value changes
      .on('value', (snapshot)=>{
        dispatch({type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val()})
      });
  };
};
