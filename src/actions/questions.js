import { _saveQuestion } from '../utils/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
      question
  }
}

export function handleAddQuestion (text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    // TODO implement add

    // return saveTweet({
    //   text,
    //   author: authedUser,
    //   replyingTo
    // })
    //   .then((tweet) => dispatch(addTweet(tweet)))
    //   .then(() => dispatch(hideLoading()))
  }
}