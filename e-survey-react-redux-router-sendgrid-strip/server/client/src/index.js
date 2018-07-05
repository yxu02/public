//if no need to assign a variable to import, one can ignore 'xxx from'
//this import allows useage of materializeCSS in root folder
import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import App from "./components/app";
import reducer from "./reducers";
import ReduxThunk from "redux-thunk";

//dummy reducer ()=>[], dummy enhancer {}
const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));

// ReactDom.render expects an component instance, not a component class
//find index.html element with id="root"
ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);

// console.log(`STRIPE PUB KEY is ${process.env.REACT_APP_STRIPE_PUB_KEY}`);
// console.log(`Environment is ${process.env.NODE_ENV}`);
