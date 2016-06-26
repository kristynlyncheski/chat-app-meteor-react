import React from 'react';
import Welcome from '../components/Welcome';
import UserList from '../components/UserList';
import AccountsUIWrapper from '../AccountsUIWrapper.jsx';


const Sidebar = React.createClass({
  render: function(){
    return (
      <div className="sidebar-container navbar">

        <AccountsUIWrapper />
        <Welcome
          currentUser={this.props.currentUser}
        />
        {this.props.currentUser ?
          <UserList
            onSelectUser={this.props.onSelectUser}
            currentUser={this.props.currentUser}
            currentChat={this.props.currentChat}
            allUsers={this.props.allUsers}
          /> : ''
        }
      </div>
    );
  }
});

export default Sidebar;
