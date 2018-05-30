import React from 'react';
import QuestionChoiceEdit from './QuestionChoiceEdit.js';
import QuestionTextEdit from './QuestionTextEdit.js';

import './QuestionEdit.css';

function QuestionEdit(props) {
  return (
    <div className='question-edit'>
      <QuestionTextEdit
        id={props.question.id}
        text={props.question.text}
        onChange={props.onQuestionTextChange}/>

      {props.question.choices.map(function(choice, index) {
        return <QuestionChoiceEdit
          id={props.question.id}
          index={index}
          text={choice.text}
          correct={choice.correct}
          onChange={props.onQuestionChoiceChange}/>
      })}

    </div>
  )
}

export default QuestionEdit;
