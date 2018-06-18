//if use ES6 "export default" syntax, make sure to use import xxxx from xxxx
//alternatively, use require('xxx').default to parse down
import React, { Component } from "react";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    //state is defined in this way only in the constructor, elsewhere use this.setState()
    //for getters, can use this.state.term anywhere no problem
    this.state = { term: "" };
  }
  render() {
    return (
      <div className="search-bar">
        <input
          //when SearchBar renders, it renders the value from the constructor
          //when user types in something, onChange triggered, state value changed
          //when state value changed, component re-renders with the updated state value
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)}
        />
      </div>
    );
  }


  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

export default SearchBar;
