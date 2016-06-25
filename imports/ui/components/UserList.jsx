import React from 'react';
import UserItem from './UserItem';

const UserList = React.createClass({
  renderUserList: function(){
    var users = this.props.allUsers;

    if (this.props.currentUser) {
      var filteredList = users.filter(user => {
        if (user.username !== this.props.currentUser.username){
          return user;
        }
      });

      var list = filteredList.map((user, index) => {
        return (
          <UserItem
            key={index}
            user={user}
            onSelectUser={this.props.onSelectUser}
          />
        )
      });
    }

    var global = {
      username: 'global',
      _id: 'global',
    };

    return (
      <ul className="user-list">
        <UserItem
          key="global"
          user={global}
          onSelectUser={this.props.onSelectUser}
        />
        {list}
      </ul>
    );
  },
  render: function(){
    return (
      <div className="user-list-container">
        {this.renderUserList()}
      </div>
    );
  }
});

export default UserList;
