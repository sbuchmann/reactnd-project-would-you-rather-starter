import {_saveQuestionAnswer, _saveQuestion, _getUsers} from '../utils/_DATA'
import { receiveUsers } from './users'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const SAVE_QUESTION_ANSWER = 'SAVE_QUESTION_ANSWER';

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

function saveQuestionAnswer ({ qid, authedUser, answer }) {
  return {
    type: SAVE_QUESTION_ANSWER,
    id: qid,
    authedUser,
    answer
  }
}

export function handleSaveQuestion (question) {
  return (dispatch) => {
    dispatch(saveQuestionAnswer(question));

    _saveQuestionAnswer(question)
    .then(() => {
      _getUsers()
        .then((users) => {
          dispatch(receiveUsers(users));
        })
    })
    .catch((e) => {
      console.warn('Error in handleSaveQuestion: ', e);
      alert('There was an error saving the question. Try again.')
    })
  }
}

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion (question) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return _saveQuestion(question)
      .then((question) => dispatch(addQuestion(question)))
      .then(() => {
        _getUsers()
          .then((users) => {
              dispatch(receiveUsers(users));
          })
        })
      .then(() => dispatch(hideLoading()))
      .catch((e) => {
          console.warn('Error in handleAddQuestion: ', e);
          alert('There was an error added the question. Try again.')
      })
  }
}
