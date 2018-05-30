import React from 'react';

import './Choice.css';

function Choice(props) {
  return (
    <div className="choice" style={props.style} id={props.id}
      onClick={(event) => props.onClick(event, props.id)}>
      {props.text}
    </div>
  )
}

export default Choice;
