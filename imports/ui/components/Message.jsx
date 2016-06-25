import React, { PropTypes } from 'react';

const Message = React.createClass({
  render: function(){
    var message = this.props.message;
    var date = message.createdAt.toString();
    if (message.author.id === this.props.currentUser._id){
      var className = 'messages-item owner';
    } else {
      className = 'messages-item';
    }

    return (
      <div className={className}>
        <p>{message.author.username} - {date}</p>
        <p>{message.text}</p>
      </div>
    );
  }
});

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;
