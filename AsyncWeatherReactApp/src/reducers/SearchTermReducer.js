export default (state=[], action) =>{
  console.log(action.payload);
  switch (action.type) {
    case 'REQUEST_SUCCESS':
      return [action.payload, ...state];
    default: return state;
  }
};