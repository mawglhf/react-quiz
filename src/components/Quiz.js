import React from "react";
// import { CSSTransitionGroup } from "react-transition-group";
import Question from "./Question";
import QuestionCount from "./QuestionCount";
import QuestionChoice from "./QuestionChoice";

function Quiz(props) {
  const renderQuestionChoices = (choice, i) => {
    return (
      <QuestionChoice
        key={i}
        correctChoice={props.correctChoice}
        choice={choice}
        disabled={props.userAnswer}
        wasAnswered={props.userAnswer}
        onAnswerSelection={props.onAnswerSelection}
      />
    );
  };

  return (
    <div>
      Quiz
      <QuestionCount
        questionId={props.questionId}
        total={props.questionTotal}
      />
      <Question question={props.question} />
      {props.choices.map(renderQuestionChoices)}
    </div>
  );
}

export default Quiz;
