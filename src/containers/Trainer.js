/**
 * Equivalent to the App.js file in Quiz.js
 * Contains all Logic and State for the Trainer
 */
import React, { Component } from "react";
import questions from "../api/questions";
import Quiz from "../components/Quiz";

class Trainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      question: "",
      questionChoices: [],
      correctChoice: "",
      userAnswer: "",
      allAnswers: [],
      score: 0
    };
    this.handleAnswerSelection = this.handleAnswerSelection.bind(this);
  }

  componentWillMount() {
    const { question, choices, correctChoice } = questions[0];
    this.setState({
      question: question,
      questionChoices: choices,
      correctChoice: correctChoice
    });
    console.log(question);
  }

  handleAnswerSelection(event) {
    const answer = event.currentTarget.value;
    if (answer === this.state.correctChoice) {
      this.setState(state => ({
        score: state.score + 1
      }));
    }

    this.setState(state => ({
      userAnswer: answer,
      allAnswers: [...state.allAnswers, answer]
    }));

    // Call a function to change the button styling

    this.checkIfQuizOver();
  }

  checkIfQuizOver() {
    // Because the previous setState call to increase allAnswers
    // has not yet completed at this point, we must manually add
    // 1 to its length to simulate the user having made another choice

    if (this.state.allAnswers.length + 1 < questions.length) {
      setTimeout(() => this.setNextQuestion(), 850);
    } else {
      setTimeout(() => this.setQuizOver(), 850);
    }
  }

  setNextQuestion() {
    const nextQuestionIndex = this.state.questionIndex + 1;
    const { question, choices, correctChoice } = questions[nextQuestionIndex];
    this.setState({
      userAnswer: "",
      questionIndex: nextQuestionIndex,
      question: question,
      questionChoices: choices,
      correctChoice: correctChoice
    });
  }

  setQuizOver() {
    this.setState({
      quizOver: true
    });
  }

  renderResults() {
    return (
      <h2>
        Score <span>{this.state.score}</span> /{" "}
        <span>{this.state.allAnswers.length}</span>{" "}
      </h2>
    );
  }

  renderQuiz() {
    return (
      <Quiz
        correctChoice={this.state.correctChoice}
        userAnswer={this.state.userAnswer}
        choices={this.state.questionChoices}
        questionId={this.state.questionIndex + 1}
        question={this.state.question}
        questionTotal={questions.length}
        onAnswerSelection={this.handleAnswerSelection}
      />
    );
  }

  render() {
    return (
      <div>
        {this.state.quizOver ? this.renderResults() : this.renderQuiz()}
      </div>
    );
  }
}

export default Trainer;
