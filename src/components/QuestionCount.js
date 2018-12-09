import React from "react";

function QuestionCount(props) {
  return (
    <div className="questionCount">
      Question <span>{props.questionId}</span> of <span>{props.total}</span>
    </div>
  );
}

export default QuestionCount;
