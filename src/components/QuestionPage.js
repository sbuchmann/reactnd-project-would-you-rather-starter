import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import {handleSaveQuestion} from '../actions/questions';

class QuestionPage extends Component {
  submitQuestion = (e, id, authedUser, option) => {
    e.preventDefault();
    this.props.dispatch(handleSaveQuestion({qid: id, authedUser, answer: option}));
  };

  render() {
    const { id, question, authedUser, users } = this.props;

    if (!question) {
        return <Redirect to='/error' />
    }

    const noOfVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

    if (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) {
      return (
        <div>
          <div>Asked by {users[question.author].name}</div>
          <img
            src={users[question.author].avatarURL}
            alt={`Avatar of ${users[question.author].name}`}
            className='avatar' />
          <div>Results:</div>
          <div>Would you rather {question.optionOne.text}: {round(question.optionOne.votes.length, noOfVotes, 0)}% ({question.optionOne.votes.length} of {noOfVotes} votes{question.optionOne.votes.includes(authedUser) ? ', YOUR VOTE' : ''}).</div>
          <div>Would you rather {question.optionTwo.text}: {round(question.optionTwo.votes.length, noOfVotes, 0)}% ({question.optionTwo.votes.length} of {noOfVotes} votes{question.optionTwo.votes.includes(authedUser) ? ', YOUR VOTE' : ''}).</div>
        </div>
      )
    } else {
      return (
        <div>
          <div>Asked by {users[question.author].name}</div>
          <img
            src={users[question.author].avatarURL}
            alt={`Avatar of ${users[question.author].name}`}
            className='avatar' />
            <div>Would you rather...</div>
            <button
                onClick={(e) => this.submitQuestion(e, question.id, authedUser, 'optionOne')}>
                {question.optionOne.text}
            </button>
          <br />
            <button
                onClick={(e) => this.submitQuestion(e, question.id, authedUser, 'optionTwo')}>
                {question.optionTwo.text}
            </button>
        </div>
      )
    }
  }
}

function round(value, sum, precision) {
  if (sum <= 0) {
    return 0;
  }
  value = value * 100 / sum;
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params;

  const question = questions[id];

  return {
    id,
    authedUser,
    users,
    question
  }
}

export default connect(mapStateToProps)(QuestionPage)