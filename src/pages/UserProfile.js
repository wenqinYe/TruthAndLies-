import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './UserProfile.css';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.db = props.firebase.firestore();
    this.userId = props.match.params.id;

    console.log(this.props.location);

    this.state = {
      user: null
    }

    this.db.collection("users").doc(this.userId).get()
      .then((doc) => {
        this.setState({user: doc.data()})
      })
  }

  renderUserProfile() {
    if(!this.state.user) {
      return <div></div>
    }
    var playText = "Play my quiz!";
    var playURL = "/u/" + this.props.match.params.id + "/play";
    var shareUrl = "https://wenqinye.github.io/truthandlies/#/u/" + this.props.match.params.id
    return (
      <div className="user-profile container">
        <img className="profile-photo-medium" src={this.state.user.photoURL}></img>
        <h1 className="user-name">{this.state.user.displayName}</h1>
        <Link to={playURL}>
          <button className="action-button spacious">
            {playText}
          </button>
        </Link>

        <div className="divider"/>

        <h4><b>Share your quiz</b></h4>
        <code>{shareUrl}</code>

      </div>
    )
  }

  render() {
    return this.renderUserProfile()
  }
}

export default UserProfile;
