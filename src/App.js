import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom';

import Quiz from './components/Quiz.js';
import QuestionEdit from './components/question_edit/QuestionEdit';

import Home from './pages/Home.js';
import Login from './pages/Login.js';
import QuizEdit from './pages/QuizEdit.js';
import QuizPlay from './pages/QuizPlay.js';
import UserProfile from './pages/UserProfile.js';

import './App.css';

require('firebase/firestore');

const config = {
  apiKey: "AIzaSyDi6Ec8hxJmEHdjQbSNOgdlj45w5IhjoX4",
  authDomain: "quizzer-f7ba6.firebaseapp.com",
  projectId: "quizzer-f7ba6"
}

firebase.initializeApp(config);

function setUserId() {
  var db = firebase.firestore();
  db.collection("users")
       .doc(firebase.auth().currentUser.uid)
       .set({
         uid: firebase.auth().currentUser.uid,
         displayName: firebase.auth().currentUser.displayName,
         photoURL: firebase.auth().currentUser.photoURL
       }, {merge: true})
       .then((doc) => {
         window.location.href = "/truthandlies/#/"
       })
       .catch((error) => {
         console.log(error);
       })
}

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccess: setUserId
  }
}


class App extends Component {
  constructor(props) {
    super(props);

    firebase.auth().onAuthStateChanged(
      (user) => this.setState({currentUser: user})
    )

    this.state = {user: null}
  }

  removeDiv() {
    this.state.divs.pop()
    this.setState({
      divs: this.state.divs
    })
  }

  renderQuestions() {
    return this.questions.map(function(question) {
      return <QuestionEdit question={question} />
    });

  }

  renderLoginSignupButton() {
    if(this.state.currentUser) {
      return <button className="secondary-button no-padding right" onClick={() => this.logout()}>Logout</button>
    } else {
        return (
          <Link to="/login">
            <button className="secondary-button no-padding right">
                  Signup/Login
            </button>
          </Link>
      )
    }

  }

  logout() {
    firebase.auth().signOut();
    window.location.reload();
  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <nav class="navbar navbar-light">
            <Link to="/" class="navbar-brand">TruthAndLies</Link>
            <li class="nav-item">
              {this.renderLoginSignupButton()}
            </li>
          </nav>

            <Route exact path='/' render={() => <Home auth={firebase.auth()}/>}/>
            <Route exact path='/u/:id' render={(props) => <UserProfile firebase={firebase} {...props}/>}/>
            <Route exact path='/u/:id/play' render={(props) => <QuizPlay firebase={firebase} {...props}/>}/>
            <Route exact path='/u/:id/edit' render={() => <QuizEdit firebase={firebase}/>}/>
            <Route exact path='/login' render={() => <Login uiConfig={uiConfig} auth={firebase.auth()}/>}/>
        </div>
      </HashRouter>
    );
  }
}

export default App;
