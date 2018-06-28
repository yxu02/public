import { EMPLOYEES_FETCH_SUCCESS} from "../actions/types";

const INITSTATE = {};

export default (state = INITSTATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
