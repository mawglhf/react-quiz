import React, { Component } from "react";

class QuestionChoice extends Component {
  checkStyling() {
    if (this.props.choice === this.props.correctChoice) {
      return "correct";
    } else {
      return "incorrect";
    }
  }
  render() {
    return (
      <button
        type="button"
        disabled={this.props.wasAnswered}
        className={this.props.wasAnswered ? this.checkStyling() : "button"}
        value={this.props.choice}
        onClick={this.props.onAnswerSelection}
      >
        {this.props.choice}
      </button>
    );
  }
}

export default QuestionChoice;
