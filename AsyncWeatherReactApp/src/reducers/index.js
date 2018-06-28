import { combineReducers } from "redux";
import SearchTermReducer from './SearchTermReducer';

const rootReducer = combineReducers({
  weather: SearchTermReducer
});

export default rootReducer;
