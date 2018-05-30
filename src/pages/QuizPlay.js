import React, { Component } from 'react';
import Quiz from '../components/Quiz.js';

import './QuizPlay.css';

class QuizPlay extends Component {
  constructor(props) {
    super(props);

    this.db = props.firebase.firestore();
    this.userId = props.match.params.id;

    this.state = {
      user: null
    }

    this.db.collection("users").doc(this.userId).get()
      .then((doc) => {
        this.setState({user: doc.data()})
      })
  }

  renderPlayingUserQuiz() {
    if(this.state.user) {
      return (
        <div className="user-playing">
          <img className="profile-photo" src={this.state.user.photoURL}/>
        </div>
      )
    }
  }

  quizClicked() {
    if(this._quiz && this._quiz.state.transitioning) {
      this._quiz.gotoNextQuestion();
    }
  }

  render() {
    return (
      <div className="quiz-play" onClick={() => this.quizClicked()}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12">
              {this.renderPlayingUserQuiz()}
            </div>
          </div>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 col-sm-9">
              {
                this.state.user
                &&
                <Quiz
                  ref={(quiz) => {this._quiz = quiz}}
                  questions={this.state.user.questions}
                  user={this.state.user}/>
              }
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default QuizPlay;
