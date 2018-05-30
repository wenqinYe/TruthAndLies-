import React, { Component } from 'react';
import Choice from './Choice.js';
import QuestionText from './QuestionText.js';
import { TransitionMotion, Motion, spring } from 'react-motion';

import './Question.css';

const DefaultCorrectStyle = {
  'background-color': '#58BA8F',
  'color': 'white',
  'border': 'none',
  'opacity': 1
}
const DefaultIncorrectStyle = {
  'opacity': 1
}
const CorrectStyle = {
  'opacity': spring(1, {stiffness: 10, damping: 17})
}
const IncorrectStyle = {
  'opacity': spring(0.1, {stiffness: 10, damping: 17})
}

class Question extends Component {
  constructor(props) {
    super(props)
  }

  computeStyle(choice) {
    if(choice.correct && this.props.highlightAnswer) {
      return CorrectStyle
    } else if (!choice.correct && this.props.highlightAnswer) {
      return IncorrectStyle
    } else {
      return {}
    }
  }

  computeDefaultStyle(choice) {
    if(choice.correct && this.props.highlightAnswer) {
      return DefaultCorrectStyle
    } else if (!choice.correct && this.props.highlightAnswer) {
      return DefaultIncorrectStyle
    } else {
      return {}
    }
  }

  renderChoice(choice, index) {
    if(this.props.highlightAnswer) {
      return (
        <Motion
          defaultStyle={this.computeDefaultStyle(choice)}
          style={this.computeStyle(choice)}>
          {
            interpolatedStyle => (
              <Choice
                text={choice.text}
                style={interpolatedStyle}
                id={index}
                onClick={this.props.onChoiceClick}/>
            )
          }
        </Motion>
      )
    } else {
      return (
        <Choice
          text={choice.text}
          style={this.computeStyle(choice)}
          id={index}
          onClick={this.props.onChoiceClick}/>
      )
    }
  }

  render() {
    return (
      <div className="question" style={this.props.style}>
        <QuestionText text={this.props.question} />

        {this.props.choices.map(function(choice, index) {
            return this.renderChoice(choice, index);
        }, this)}

      </div>
    )
  }
}

export default Question;
