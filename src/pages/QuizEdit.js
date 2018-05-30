import React, { Component } from 'react';
import firebase from 'firebase';

import QuizEditor from '../components/QuizEditor';
import './QuizEdit.css';

const blankChoices = [
        {text: "", correct: false},
       {text: "", correct: true},
        {text: "", correct: false}
      ]

class QuizEdit extends Component {
  constructor(props) {
    super(props);

    this.auth = firebase.auth();
    this.db = firebase.firestore();

    this.state = {
      questions: [],
      currentUser: {displayName: ""},
      savingMode: false
    }

    this.auth.onAuthStateChanged(
      (user) => {
        this.setState({currentUser: user});
        this.retrieveQuestions();
      }
    )
  }

  retrieveQuestions() {
    this.db.collection("users")
         .doc(this.state.currentUser.uid)
         .get()
         .then((doc) => {
           var questions = doc.data().questions;
           if(!questions) {
             questions = []
           }
           this.setState({questions: questions});
         })
         .catch((error) => {

         })
  }

  saveQuestions() {
    this.setState({savingMode: true})
    var questionsToSave = [];

    for(var i = 0; i < this.state.questions.length; i++) {
      var question = this.state.questions[i];
      if(question.text !== "" && question.choices !== blankChoices) {
        questionsToSave.push(question)
      }
    }
    this.db.collection("users")
         .doc(this.state.currentUser.uid)
         .update({
           questions: questionsToSave
         })
         .then((doc) => {
           this.setState({
             savingMode: false,
             questions: questionsToSave
           })
         })
         .catch((error) => {

         })
  }

  findQuestionWithId(id, questions) {
    for(var i = 0; i < questions.length; i++) {
      var question = questions[i];
      // double inequality is on puprose to allow for
      // a less strict matching of id
      if(question.id == id) {
        return question
      }
    }
  }

  editQuestionWithId(id, value, command, index) {
    var question = this.findQuestionWithId(id);
    if(command === 'questionText') {
      question.text = value;
    } else if (command === 'choice-text') {
      question.choices[index].text = value;
    } else if (command == 'choice-checkbox') {
      question.choices[index].correct = value;
    }
  }

  onQuestionTextChange(event) {
    var questionsCopy = this.state.questions.slice()

    var target = event.target;
    var id = target.getAttribute('id');

    var question = this.findQuestionWithId(id, questionsCopy);

    question.text = target.value;

    this.setState({questions: questionsCopy});
  }

  onQuestionChoiceChange(event) {
    var questionsCopy = this.state.questions.slice()

    var target = event.target;
    var id = target.getAttribute('id');
    var index = target.getAttribute('index');

    var question = this.findQuestionWithId(id, questionsCopy);

    if(target.type === 'text') {
      question.choices[index].text = target.value;
    } else if (target.type === 'checkbox') {
      question.choices[index].correct = target.checked;
    }

    this.setState({questions: questionsCopy});
  }

  addQuestion() {
    var questionsCopy = this.state.questions.slice();
    var questionTemplate = {
      id: this.guidGenerator(),
      text: "",
      choices: [
        {text: "", correct: false},
       {text: "", correct: true},
        {text: "", correct: false}
      ]
    }
    questionsCopy.push(questionTemplate);
    this.setState({questions: questionsCopy});
  }

  guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  renderSavingButton() {
    if(this.state.savingMode) {
      return (
        <button className="action-button block" disabled>
          Saving...
        </button>
      )
    } else {
      return (
        <button className="action-button block" onClick={() => this.saveQuestions() }>
          Save Quiz
        </button>
      )
    }
  }

  render() {
    return (
      <div className="quiz-edit">
        <div className="container">
          <div className="row">
            <div className="user-info col-md-12 col-sm-12">
              <img className="user-photo" src={this.state.currentUser.photoURL} />
              <h1 className="user-name">{this.state.currentUser.displayName}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2 col-sm-0"></div>
            <div className="col-md-8 col-sm-12">
              <QuizEditor
                questions={this.state.questions}
                onQuestionTextChange={(event) => this.onQuestionTextChange(event)}
                onQuestionChoiceChange={(event) => this.onQuestionChoiceChange(event)}
                onAddQuestion={() => this.addQuestion()}/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              {this.renderSavingButton()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default QuizEdit;
