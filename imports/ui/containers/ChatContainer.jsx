import React from 'react';
import MessagesContainer from './MessagesContainer';
import MessageInput from '../components/MessageInput';

const ChatContainer = React.createClass({
  render: function(){
    return (
      <div className="inner-chat-container">
        <div className="current-chat-name">
          <h2>{this.props.currentChat.username}</h2>
        </div>
        <MessagesContainer
          renderMessages={this.props.renderMessages}
          currentChat={this.props.currentChat}
        />
        <MessageInput
          onSubmit={this.props.onSubmit}
        />
      </div>
    );
  }
});

export default ChatContainer;
