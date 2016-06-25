import React, { PropTypes } from 'react';

const Message = React.createClass({
  showDate: function(){
    var message = this.props.message;
    var date = message.createdAt;

    var month = date.getMonth();
    var day = date.getDate();
    var year = date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();

    var months = ["January" , "February" , "March" , "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // date = months[month] + ' ' + day + ', ' + year + ' ' + hours + ':' + minutes;
    date = '(' + hours + ':' + minutes + ')';

    return date;
  },
  render: function(){
    var message = this.props.message;
    // var date = message.createdAt.toString();
    if (message.author.id === this.props.currentUser._id){
      var className = 'messages-item owner';
    } else {
      className = 'messages-item';
    }

    return (
      <div className={className}>
        <p className="message-info">{message.author.username} <span className="message-date">{this.showDate()}</span></p>
        <p className="message-text">{message.text}</p>
      </div>
    );
  }
});

Message.propTypes = {
  message: PropTypes.object.isRequired,
};

export default Message;
