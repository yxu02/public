import { EMPLOYEE_UPDATE, EMPLOYEE_CREATE} from "../actions/types";

const INITSTATE = {
  name: "",
  phone: "",
  shift: "Thursday"
};

export default (state = INITSTATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
      //key interpolation. At runtime it will be: 'name':value1, 'phone':value2...
      return { ...state, [action.payload.prop]: action.payload.value };
      //EMPLOYEE__CREATE is to clear up all previous states for empty forms
    case EMPLOYEE_CREATE:
      return INITSTATE;
    default:
      return state;
  }
};
