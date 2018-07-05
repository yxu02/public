import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.props.surveys.reverse().map(survey => {
          return (
            <div key={survey.title}>
              <div className="card lighten-5">
                <div className="card-content black-text-text">
                  <span
                    className="left-align card-title"
                    style={{ marginBottom: "20px" }}
                  >
                    {survey.title}
                  </span>
                  <p className="left" style={{ fontSize: 16 }}>
                    Survey body: {survey.body}
                  </p>
                  <br />
                  <br />
                  <p className="right" style={{ fontSize: 16 }}>
                    Last response:{" "}
                    {new Date(survey.lastResponded).toLocaleDateString()}
                  </p>
                  <br />
                  <br />

                  <div className="card-action" style={{ margin: "20 20px" }}>
                    <a>'Yes' votes: {survey.yes}</a>
                    <a>'No' votes: {survey.no}</a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="fixed-action-btn">
          <Link className="btn-floating btn-large red" to="/surveys/new">
            <i className="large material-icons">add</i>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
