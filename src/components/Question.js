import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Question extends Component {
  render() {
    const { question, users } = this.props;

    if (question === null) {
      return <p>This question doesn't exist.</p>
    }

    return (
      <div>
        <div style={{border: 'solid 1px', float: 'left'}}>
          <h4>{users[question.author].name} asks:</h4>
          <div style={{float: 'left'}}>
            <img
              src={users[question.author].avatarURL}
              alt={`Avatar of ${users[question.author].name}`}
              className='avatar' />
          </div>
          <div style={{float: 'left'}}>
            <b>Would you rather</b>
            <br /><br />
            {question.optionOne.text} <u>or</u> {question.optionTwo.text}
            <br /><br />
            <button>View Poll</button>
          </div>
        </div>
        <div style={{clear: 'both'}}></div>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users, questions }, { id }) {
  const question = questions[id];

  return {
    authedUser,
    users,
    question
  }
}

export default withRouter(connect(mapStateToProps)(Question))