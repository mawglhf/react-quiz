import React, { Component } from "react";
import questions from "../api/questions";
import Quiz from "../components/Quiz";
import Results from "../components/Results";

class Trainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      question: "",
      questionChoices: [],
      questionImage: "",
      correctChoice: "",
      userAnswer: "",
      allAnswers: [],
      score: 0
    };
    this.handleAnswerSelection = this.handleAnswerSelection.bind(this);
  }

  componentWillMount() {
    const { question, choices, correctChoice, image } = questions[0];
    this.setState({
      question: question,
      questionChoices: choices,
      correctChoice: correctChoice,
      questionImage: image
    });
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
    const { question, choices, correctChoice, image } = questions[
      nextQuestionIndex
    ];
    this.setState({
      userAnswer: "",
      questionIndex: nextQuestionIndex,
      question: question,
      questionChoices: choices,
      correctChoice: correctChoice,
      questionImage: image
    });
  }

  setQuizOver() {
    this.setState({
      quizOver: true
    });
  }

  renderResults() {
    return (
      <Results score={this.state.score} questionTotal={questions.length} />
    );
  }

  renderQuiz() {
    return (
      <Quiz
        image={this.state.questionImage}
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
