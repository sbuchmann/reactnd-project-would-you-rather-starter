import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Question extends Component {
  toQuestion = (e, id) => {
    e.preventDefault();
    this.props.history.push(`/question/${id}`)
  };

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
            <button
              onClick={(e) => this.toQuestion(e, question.id)}>View Poll</button>
          </div>
        </div>
        <div style={{clear: 'both'}} />
      </div>
    )
  }
}

function mapStateToProps ({ users, questions }, { id }) {
  const question = questions[id];

  return {
    users,
    question
  }
}

export default withRouter(connect(mapStateToProps)(Question))