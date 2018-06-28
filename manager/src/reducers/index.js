import { combineReducers } from "redux";
import AuthReducer from "./authReducer";
import EmployeeFormReducer from "./employeeFormReducer";
import EmployeeListReducer from "./employeeListReducer";

export default combineReducers({
  auth: AuthReducer,
  employeeForm: EmployeeFormReducer,
  employeeList: EmployeeListReducer
});
