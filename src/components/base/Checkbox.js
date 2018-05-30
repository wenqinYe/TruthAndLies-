import React from 'react';

import './Checkbox.css';

function Checkbox(props) {
  return (
    <div class='checkbox'>
      <input
        type="checkbox"
        checked={props.correct}
        {...props}></input>
      <div class="checkmark">
          <span class="glyphicon glyphicon-ok"></span>
      </div>
    </div>
  )
}

export default Checkbox;
