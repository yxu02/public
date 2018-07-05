import React, { Component } from "react";
import {connect} from 'react-redux';
import { BrowserRouter, Route} from "react-router-dom";
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import * as actions from '../actions';

class App extends Component {
  //why not use componentWillMount?
  //1. componentWillMount can be called multiple times
  //2. componentDidMount is called only once
  //3. componentDidMount is called only a fraction second later than componentWillMount
  //4. timing wise, the two methods almost get called at the same time
  componentDidMount(){
    this.props.fetchUser();
  }

  render() {
    return (
      //materializeCSS assume all elements have a higher level root called "container"
      //some styles are applied to this root
      <div className="container">
        <BrowserRouter>
          <div>
            <Header/>
            {/*exact to have exact match for routing*/}
            {/*component is visible and accessible after specific route*/}
            <Route exact path="/" component={Landing}/>
            <Route exact path="/surveys" component={Dashboard}/>
            <Route exact path="/surveys/new" component={SurveyNew}/>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);