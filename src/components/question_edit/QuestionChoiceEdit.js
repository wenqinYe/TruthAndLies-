import React from 'react';

import Checkbox from '../base/Checkbox';

import './QuestionChoiceEdit.css';

function QuestionChoiceEdit(props) {
  return (
    <div className='question-choice-edit'>
      <Checkbox
        id={props.id}
        index={props.index}
        checked={props.correct}
        onChange={props.onChange}/>
      <input
        id={props.id}
        index={props.index}
        type='text'
        value={props.text}
        placeholder="Click to type in an answer..."
        onChange={props.onChange} />
    </div>
  )
}

export default QuestionChoiceEdit;
