import React from 'react';

const UserItem = React.createClass({
  // componentDidMount: function(){
  //
  //   var messages = this.props.messages;
  //
  //   if (message.author.id === this.state.currentChat._id && message.recipient._id === this.props.currentUser._id && !message.read){
  //     add clasname of 'unread-message' to li
  //   }

    // var selectedUser = document.querySelectorAll(".selected-user");
    //
    // for (var i = 0; i < selectedUser.length; i++){
    //   selectedUser[i].classList.remove("selected-user");
    // }
    //
    // event.target.classList.add("selected-user");
  // },
  selectUser: function(event){
    event.preventDefault();
    // console.log(event);
    // console.log(this);
    this.props.onSelectUser(this.props.user);

    var selectedUser = document.querySelectorAll(".selected-user");

    for (var i = 0; i < selectedUser.length; i++){
      selectedUser[i].classList.remove("selected-user");
    }

    event.target.classList.add("selected-user");
  },
  render: function(){
    if (this.props.currentChat._id === 'global' && this.props.user._id === 'global'){
      return (
        <li className="selected-user" key={this.props.user._id} onClick={this.selectUser}>{this.props.user.username}</li>
      );
    }

    return (
      <li key={this.props.user._id} onClick={this.selectUser}>{this.props.user.username}</li>
    );
  }
});

export default UserItem;
