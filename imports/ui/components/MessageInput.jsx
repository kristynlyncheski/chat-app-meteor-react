import React from 'react';

const MessageInput = React.createClass({
  componentDidMount: function(){

    var messageInput = this.refs.messageInput;
    var that = this;
    messageInput.addEventListener("keydown", function(event){
      if (event.keyCode == 13) {
        event.preventDefault();
        that.props.onSubmit(event);
        // console.log("enter key was pressed");
      };
    });
  },
  render: function(){
    return (
      <div className="message-form-container">
        <form className="message-form" onSubmit={this.props.onSubmit}>
          <textarea placeholder="Message" id="message-input" ref="messageInput"></textarea>
          <button type="submit" id="submit-button"><i className="fa fa-paper-plane fa-2x" aria-hidden="true"></i></button>
        </form>
      </div>
    );
  }
});

export default MessageInput;
