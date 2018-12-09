import React from "react";
function Results(props) {
  return (
    <h2>
      Score <span>{props.score}</span> / <span>{props.questionTotal}</span>{" "}
    </h2>
  );
}
export default Results;
