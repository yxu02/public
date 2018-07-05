import React, { Component } from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";

class SurveyReview extends Component {
  render() {
    const { formValues, history } = this.props;
    return (
      <div style={{ margin: "0 10px" }}>
        <h5>Please confirm your entries</h5>
        {formFields.map(({ name, label }) => {
          return (
            <div key={label}>
              <label style={{ fontSize: 15, fontWeight: "bold" }}>
                {label}
              </label>
              <div style={{ marginBottom: "20px" }}>{formValues[name]}</div>
            </div>
          );
        })}
        <button className="left btn" onClick={this.props.onCancel}>
          Back
          <i className="left material-icons">chevron_left</i>
        </button>
        <button
          className="right btn"
          onClick={() => this.props.onSubmitSurvey(formValues, history)}
        >
          Send
          <i className="right material-icons">email</i>
        </button>
      </div>
    );
  }
}

//mapStateToProps and connect can be used to functional components
const mapStateToProps = state => {
  return {
    formValues: state.form.surveyForm.values
  };
};

export default connect(
  mapStateToProps,
  actions
)(withRouter(SurveyReview));
//withRouter will pass 'history' to component props
