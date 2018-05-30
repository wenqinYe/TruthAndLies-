import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    }
  }

  editQuiz() {

  }

  shareQuiz() {

  }

  componentDidMount() {
    this.props.auth.onAuthStateChanged((user) => {
      if(user) {
        this.setState({currentUser: user});
      }
    })
  }

  render() {
    if(this.state.currentUser) {
      return (
        <div className="home-page-logged-in">
          <h1> Hello {this.state.currentUser.displayName} </h1>
          <section>
            <Link  to={'/u/324fdsf234/edit'}>
              <button className="action-button">
                Edit Your Quiz
              </button>
            </Link>
          </section>
          <section>
            <Link to={'/u/'+this.state.currentUser.uid}>
              <button className="secondary-button">
                View your quiz
              </button>
            </Link>
          </section>
        </div>
      )
    } else {
      return (
        <div className="home-page">
          <div className="container">
            <div className="row main">
              <h1> Get people to learn about you better </h1>
              <h1> Make a personal quiz! </h1>
                <Link to={'/login'}>
                  <button className="action-button">
                      Sign up / Login
                  </button>
                </Link>
            </div>

            <div className="row">
              <div className="col-md-7">
                <img className="showoff-photo" src="/truthandlies/edit.png"></img>
              </div>
              <div className="col-md-5">
                <h3>Make your quiz</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-md-5">
                <h3 className="right">Have people play your quiz</h3>
              </div>
              <div className="col-md-7">
                  <img className="showoff-photo" src="/truthandlies/play.png"></img>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Home;
