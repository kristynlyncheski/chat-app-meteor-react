import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../api/messages.js';

import Sidebar from './containers/Sidebar';
// import Welcome from './components/Welcome';
// import UserList from './components/UserList';
import ChatContainer from './containers/ChatContainer';
import Message from './components/Message';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';

const App = React.createClass({
  getInitialState: function(){
    return {
      currentUser: this.props.currentUser,
      currentChat: {
        username: 'global',
        _id: 'global',
      },
      // unreadMessages: [],
    }
  },
  // componentDidMount: function(){
    // console.log(this.props.messages);
    // this.setState({
    //   messages: this.props.messages
    // })
    // this.checkUnread();
  // },

  componentDidMount: function(){
    var hamButton = document.querySelector('.hamburger-button');

    function animateHamburger() {
      hamButton.classList.toggle('open');
    }

    function slideMenu() {
      var navBar = document.querySelector('.navbar');
      navBar.classList.toggle('open');
      if (navBar.classList.contains('transition') > -1){
        navBar.classList.add('transition');
      }
    }

    hamButton.addEventListener('click', function() {
      animateHamburger();
      slideMenu();
    });
  },
  handleSelectUser: function(user){
    // console.log(user);
    this.setState({
      currentChat: user,
    });
    document.getElementById('message-input').value = '';
  },
  handleSubmit(event){
    event.preventDefault();
    const text = document.getElementById('message-input').value;
    const recipient = this.state.currentChat;

    if (text) {
      Meteor.call('messages.insert', text, recipient);

      document.getElementById('message-input').value = '';
    }

  },
  renderMessages: function(){
    var messages = this.props.messages;

    /* GLOBAL CHAT */
    if (this.state.currentChat._id === 'global') {
      messages = messages.filter(message => {
        if (message.recipient._id === this.state.currentChat._id){
          return message;
        }
      });
      return messages.map((message) => (
        <Message
          key={message._id}
          message={message}
          currentUser={this.props.currentUser}
        />
      ));
    } else {
      /* DIRECT MESSAGES */
      messages = messages.filter(message => {
        if (message.author.id === this.props.currentUser._id && message.recipient._id === this.state.currentChat._id){
          return message;
        } else if (message.author.id === this.state.currentChat._id && message.recipient._id === this.props.currentUser._id){
          Meteor.call('messages.markRead', message._id);
          return message;
        }
      });
      return messages.map((message) => (
        <Message
          key={message._id}
          message={message}
          currentUser={this.props.currentUser}
        />
      ));
    };
  },
  // checkUnread: function(){
  //   var messages = this.props.messages;
  //   var currentUserUnread = messages.filter(message => {
  //     if (message.recipient._id === this.props.currentUser._id && message.read === false){
  //       return message;
  //     }
  //   });
  //
  //   console.log(currentUserUnread);
  //
  //   // var unreadArr = [];

    // for (var i = 0; i < currentUserMessages.length; i++){
      // var message = currentUserMessages[i];
      // if (!message.read){
      // if (message.author.id !== currentChat._id && !message.read){
    //     if (unreadArr.indexOf(message.author.id) === -1) {
    //       unreadArr.push(message.author.id);
    //     }
      // }
    // };

    // this.setState({
      // unreadMessages: unreadArr,
    // });
  // },
  render: function(){
    // console.log("allUsers",this.props.allUsers);
    return (
      <div className="container">
        <Sidebar
          currentUser={this.props.currentUser}
          currentChat={this.state.currentChat}
          allUsers={this.props.allUsers}
          onSelectUser={this.handleSelectUser}
        />

        <div className="mobile-nav">
          <div className="hamburger-wrapper">
            <div className="hamburger-button">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className="chat-container">
          {this.props.currentUser ?
            <ChatContainer
              currentChat={this.state.currentChat}
              renderMessages={this.renderMessages}
              onSubmit={this.handleSubmit}
            /> :
            <div className="sign-in-message">
              <p>Sign in to start chatting!</p>
            </div>
          }
        </div>
      </div>
    );
  }
});

App.propTypes = {
  messages: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('messages');
  Meteor.subscribe('all_users');

  return {
    messages: Messages.find({}).fetch(),
    currentUser: Meteor.user(),
    allUsers: Meteor.users.find({}, { sort: { username: 1 } }).fetch(),
  };
}, App);
