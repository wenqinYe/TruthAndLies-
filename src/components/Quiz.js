import React, { Component } from 'react';
import Question from './question/Question.js';
import Transition from 'react-transition-group/Transition';
import { TransitionMotion, Motion, spring } from 'react-motion';
import { Link } from 'react-router-dom';

import './Quiz.css';

class Quiz extends Component {
  /*
  States:
    The current question index
    The number of correct choices
    Boolean indicating whether or not to transition to the next question

    - Can compute if game is over by seeing if current question index is equaled
      the number of questions
   */
  constructor(props) {
    super(props);

    this.state = {
      currentQuestionIndex: 0,
      correctChoices: 0,
      transitioning: false,
      context: [props.questions[0]],
      highlightAnswers: []
    }

    for(var i = 0; i < props.questions.length; i++) {
      this.state.highlightAnswers.push(false);
      props.questions[i].index = i;
    }

    this._questionTransitionTimeout = null
  }

  gotoNextQuestion() {
    /*
      Ensure that if 'gotoNextQuestion' is manually triggered
      that the timed transitions are cancelled to prevent
      double transitions.
    */
    clearTimeout(this._questionTransitionTimeout);

    var newContext = this.state.context.slice()
    var newCurrentQuestionIndex = this.state.currentQuestionIndex + 1
    newContext.splice(0, 1);
    newContext.push(this.props.questions[newCurrentQuestionIndex]);

    this.setState({
      currentQuestionIndex: newCurrentQuestionIndex,
      context: newContext,
      transitioning: false
    })
  }

  onChoiceClick(event, index) {
    if(this.state.transitioning) {
      return;
    }

    var choice = this.props.questions[this.state.currentQuestionIndex].choices[index];
    var newHighlightAnswers = this.state.highlightAnswers.slice();
    newHighlightAnswers[this.state.currentQuestionIndex] = true;
    this.setState({
      correctChoices: choice.correct ? this.state.correctChoices + 1 : this.state.correctChoices,
      highlightAnswers: newHighlightAnswers,
      chosenChoiceId: index,
      transitioning: true
    });

    this._questionTransitionTimeout = setTimeout(() => {
      // this.gotoNextQuestion();
    }, 2500)
  }

  renderQuestion(question, style) {
    var highlightAnswer = this.state.highlightAnswers[question.index]
    return (
      <div className="question-container"
        style={style}>
        <Question
          question={question.text}
          choices={question.choices}
          highlightAnswer={highlightAnswer}
          onChoiceClick={this.onChoiceClick.bind(this)}>
        </Question>
      </div>
    )
  }

  changeContext() {
    var newContext = this.state.context.slice();
    var newCurrentQuestionIndex = this.state.currentQuestionIndex + 1
    newContext.push(this.props.questions[newCurrentQuestionIndex])
    this.setState({
      context: newContext
    })
  }

  removeContext() {
    var newContext = this.state.context.slice();
    var newCurrentQuestionIndex = this.state.currentQuestionIndex + 1
    newContext.splice(0, 1);
    this.setState({
      context: newContext
    })
  }

  willLeave() {
    return {
      opacity: spring(0, {stiffness: 10, damping: 17}),
      'right': spring(600, {stiffness: 10, damping: 17})
    }
  }

  willEnter() {
    return {
      'opacity': 0,
      'right': -600
    }
  }

  endQuizView() {
    var nameText = this.props.user.displayName + "'s quiz";
    return (
      <div className="quiz-end">
        <h3 className="name-text">{nameText}</h3>
        <h3 className="result"> You got {this.state.correctChoices}/{this.props.questions.length} right!</h3>

        <div className="divider"/>

        <h3>Make your own quiz!</h3>
        <Link to="/login">
          <button className="action-button"> Sign up with Google</button>
        </Link>
      </div>
    )
  }

  mainQuizView() {
    return (
      <div className="quiz">
        <TransitionMotion
          willLeave={this.willLeave}
          willEnter={this.willEnter}
          styles={this.state.context.map((question, index) => ({
            key: question.id,
            style: {'opacity': spring(1, {stiffness: 10, damping: 17}), 'right': spring(0, {stiffness: 10, damping: 17})},
            data: question
          }))}>
          {
            interpolatedStyles =>
              <div>
                {
                  interpolatedStyles.map(config => {
                    return this.renderQuestion(config.data,
                                               config.style)
                  })
                }
             </div>
          }
        </TransitionMotion>
      </div>
    )
  }

  render() {
    if(this.state.currentQuestionIndex >= this.props.questions.length) {
      return this.endQuizView();
    } else {
      return this.mainQuizView();
    }

  }
}

export default Quiz;
