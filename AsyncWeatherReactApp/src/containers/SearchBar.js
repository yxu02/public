import React, { Component } from "react";
import { connect } from "react-redux";
import { handleTextInput } from "../actions/index";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }
  submitForm = event => {
    event.preventDefault();
    this.props.handleTextInput(this.state.term);
  };
  render() {
    return (
      <form className="input-group" onSubmit={this.submitForm}>
        <input
          placeholder="Enter a city name to get a five-day forecast"
          className="form-control"
          value={this.state.term}
          onChange={event => this.setState({ term: event.target.value })}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">
            Search
          </button>
        </span>
      </form>
    );
  }
}

export default connect(
  null,
  { handleTextInput }
)(SearchBar);
