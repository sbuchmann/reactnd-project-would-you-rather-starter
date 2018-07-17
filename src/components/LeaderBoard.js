import React, { Component } from 'react'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
  render () {
      console.log('X12', this.props.users)
    return (
      <div>
        <div>
          {this.props.users.map((user, index) => (
            <div key={user.id}>
                <div style={{border: 'solid 1px', float: 'left'}}>
                    <h4>{index+1}. {user.name}</h4>
                    <div style={{float: 'left'}}>
                        <img
                            src={user.avatarURL}
                            alt={`Avatar of ${user.name}`}
                            className='avatar' />
                    </div>
                    <div style={{float: 'left'}}>
                        <b>Score: {(Object.keys(user.answers).length + user.questions.length)}</b>
                        <br /><br />
                        Answered questions: {Object.keys(user.answers).length}
                        <br /><br />
                        Created questions: {user.questions.length}
                    </div>
                </div>
                <div style={{clear: 'both'}} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ users, authedUser }) {
  const ids = Object.keys(users)
    .sort((a,b) => (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length));
  const usersArray = [];
  ids.forEach((id) => {
      usersArray[usersArray.length] = users[id];
  });
  return {
    users: usersArray
  }
}

export default connect(mapStateToProps)(LeaderBoard)