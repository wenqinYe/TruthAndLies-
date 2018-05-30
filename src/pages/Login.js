import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="login-page">
        <h1> Signup/Login to make your own quiz </h1>
        <StyledFirebaseAuth uiConfig={this.props.uiConfig} firebaseAuth={this.props.auth}>
        </StyledFirebaseAuth>
      </div>
    )
  }
}

export default Login;
