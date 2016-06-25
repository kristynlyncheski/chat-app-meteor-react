import React from 'react';

const Welcome = React.createClass({
  renderWelcome(){
    if (this.props.currentUser){
      return (
        <p>Hello, {this.props.currentUser.username}!</p>
      )
    } else {
      return;
    }
  },
  render: function(){
    return (
      <div className="welcome">
        <h1>Name of App</h1>
        {this.renderWelcome()}
        <hr className="small-hr"/>
      </div>
    );
  }
});

export default Welcome;
