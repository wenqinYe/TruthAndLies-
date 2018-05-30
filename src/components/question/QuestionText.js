import React from 'react';

import './QuestionText.css';

function QuestionText(props) {
  return (
    <h2 className="question-text"> { props.text } </h2>
  )
}

export default QuestionText;
