export default (state = null, action) => {
  // console.log(action);
  switch (action.type) {
    case "FETCH_USER":
      //this equals: action.payload ? action.payload : false;
      return action.payload || false;
    default:
      return state;
  }
};
