import axios from "axios";
import { keys } from "../../config/keys";

export const handleTextInput = text => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${text}&appid=${
    keys.API_KEY
  }`;

  return async dispatch => {
    try {
      const response = await axios.get(url);
      console.log('success! '+response.status);
      dispatch({ type: "REQUEST_SUCCESS", payload: response.data });
    } catch (e) {
      console.log('fail! '+e.response.status);
      dispatch({ type: "REQUEST_FAIL", payload: e.response.data });
    }
  };
};
