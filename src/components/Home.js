import React, { Component } from 'react'
import { connect } from 'react-redux'

import Question from './Question'

class Home extends Component {
  render () {
    return (
      <div>
          <h3 className='center'>Would you rather</h3>
          {this.props.questionsUnanswered.length > 0 && (
              <div>
                  <h3>Unanswered</h3>
                  {this.props.questionsUnanswered.map((question) => (
                      <Question id={question.id} />
                  ))}
              </div>
          )}
          <h3>Answered</h3>
          {this.props.questionsAnswered.map((question) => (
            <Question id={question.id} />
          ))}
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