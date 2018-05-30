import React from 'react';

import './QuestionTextEdit.css';

function QuestionTextEdit(props) {
  return (
    <input
      className='question-text-edit' type='text'
      value={props.text}
      onChange={props.onChange}
      placeholder="Type a question..."
      {...props}/>
  )
}

export default QuestionTextEdit;
