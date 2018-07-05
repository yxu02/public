import axios from "axios";

export const fetchUser = () => {
  return async dispatch => {
    const { data } = await axios.get("/api/current_user");
    dispatch({ type: "FETCH_USER", payload: data });
  };
};
//this step shows customer is willing to pay. First step connection with Stripe for txn is established.
// Stripe sent back a token
export const onReceiveToken = token => {
  return async dispatch => {
    //this step will deal with actual transaction charges
    const { data } = await axios.post("/api/txn", token);
    dispatch({ type: "FETCH_USER", payload: data });
  };
};

export const onSubmitSurvey = (survey, history) => {
  return async dispatch => {
    //this step will deal with actual transaction charges
    const { data } = await axios.post("/api/surveys", survey);
    history.push("/surveys");
    dispatch({ type: "FETCH_USER", payload: data });
  };
};

export const fetchSurveys = () => {
  return async dispatch => {
    //this step will deal with actual transaction charges
    const { data } = await axios.get("/api/surveys");
    dispatch({ type: "FETCH_SURVEYS", payload: data });
  };
};
