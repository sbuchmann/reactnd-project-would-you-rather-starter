import { _getUsers, _getQuestions } from '../utils/_DATA'
import { setAuthedUser } from '../actions/authedUser'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'tylermcginnis';

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading());
    return _getUsers()
      .then((users) => {
        dispatch(receiveUsers(users));
        _getQuestions()
            .then((questions) => {
                dispatch(hideLoading());
                dispatch(receiveQuestions(questions));
                dispatch(setAuthedUser(AUTHED_ID))
            }
          )
      })
  }
}