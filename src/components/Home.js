import React, { Component } from 'react'
import { connect } from 'react-redux'

import Question from './Question'

class Home extends Component {
  render () {
    return (
      <div>
        <h3 className='center'>Would you rather</h3>
        <ul className='dashboard-list'>
          <h4>Answered</h4>
          {this.props.questionsAnswered.map((question) => (
            <li key={question.id}>
                <Question id={question.id} />
            </li>
          ))}

          <h4>Unanswered</h4>
            {this.props.questionsUnanswered.map((question) => (
                <li key={question.id}>
                    <Question id={question.id} />
                </li>
            ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions, authedUser }) {
  const ids = Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
  const questionsArray = [];
  ids.forEach((id) => {
      questionsArray[questionsArray.length] = questions[id];
  });
  return {
    questionsAnswered: questionsArray.filter((question) => {
      return question.optionOne.votes.includes(authedUser) ||
          question.optionTwo.votes.includes(authedUser)
    }),
    questionsUnanswered: questionsArray.filter((question) => {
        return !question.optionOne.votes.includes(authedUser) &&
            !question.optionTwo.votes.includes(authedUser)
    })
  }
}

export default connect(mapStateToProps)(Home)