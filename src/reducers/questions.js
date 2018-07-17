import { RECEIVE_QUESTIONS, ADD_QUESTION, SAVE_QUESTION_ANSWER } from '../actions/questions'

export default function questions (state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS :
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_QUESTION_ANSWER :
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          [action.answer]: {
            ...state[action.id][action.answer],
            votes: state[action.id][action.answer].votes.concat([action.authedUser])
          }
        }
      };
    case ADD_QUESTION :
      const { question } = action;
      return {
        ...state,
        [action.question.id]: action.question
      };
    default :
      return state
  }
}
