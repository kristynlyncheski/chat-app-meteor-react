import React, { PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { Messages } from '../api/messages.js';

import Welcome from './components/Welcome';
import UserList from './components/UserList';
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
    }
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
  render: function(){
    // console.log("allUsers",this.props.allUsers);
    return (
      <div className="container">
        <div className="sidebar-container">

          <AccountsUIWrapper />
          <Welcome
            currentUser={this.props.currentUser}
          />
          {this.props.currentUser ?
            <UserList
              currentUser={this.props.currentUser}
              currentChat={this.state.currentChat}
              allUsers={this.props.allUsers}
              onSelectUser={this.handleSelectUser}
            /> : ''
          }
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
