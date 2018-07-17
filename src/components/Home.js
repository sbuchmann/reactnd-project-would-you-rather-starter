import React, { Component } from 'react'
import { connect } from 'react-redux'

import Question from './Question'

class Home extends Component {
  render () {
    const {questionsUnanswered, questionsAnswered} = this.props;
    return (
      <div>
          <h3 className='center'>Would you rather</h3>
          {questionsUnanswered.length > 0 && (
              <div>
                  <h3>Unanswered</h3>
                  {questionsUnanswered.map((question) => (
                      <Question id={question.id} />
                  ))}
              </div>
          )}
          <h3>Answered</h3>
          {questionsAnswered.map((question) => (
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

  let questionsAnswered = [];
  let questionsUnanswered = [];
  if (authedUser) {
      questionsAnswered = questionsArray.filter((question) => {
          return question.optionOne.votes.includes(authedUser) ||
              question.optionTwo.votes.includes(authedUser)
      });
      questionsUnanswered = questionsArray.filter((question) => {
          return !question.optionOne.votes.includes(authedUser) &&
              !question.optionTwo.votes.includes(authedUser)
      })
  }

  return {
    questionsAnswered,
    questionsUnanswered
  }
}

export default connect(mapStateToProps)(Home)