import React, { Component } from "react";
import SurveyForm from "./SurveyForm";
import SurveyReview from "./SurveyReview";
import { reduxForm } from "redux-form";

class SurveyNew extends Component {
  state = { showFormReview: false };

  render() {
    return (
      <div>
        <h1>New Survey</h1>
        {this.renderContents()}
      </div>
    );
  }

  renderContents = () => {
    if (this.state.showFormReview) {
      return (
        <SurveyReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <SurveyForm onNext={() => this.setState({ showFormReview: true })} />
    );
  };
}

//this is to help clear the form once user nav away from survey new
export default reduxForm({ form: "surveyForm" })(SurveyNew);
