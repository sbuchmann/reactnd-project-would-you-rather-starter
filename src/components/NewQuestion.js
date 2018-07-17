import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: ''
  };

  handleChangeOptionOne = (e) => {
    const optionOne = e.target.value;
    this.setState(() => ({
      optionOne,
      optionTwo: this.state.optionTwo
    }))
  };

  handleChangeOptionTwo = (e) => {
    const optionTwo = e.target.value;
    this.setState(() => ({
      optionOne: this.state.optionOne,
      optionTwo
    }))
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state;
    const { dispatch, id, authedUser } = this.props;

    dispatch(handleAddQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authedUser
    }));

    this.setState(() => ({
      optionOne: '',
      optionTwo: ''
    }));

    this.props.history.push(`/home`);
  };

  render() {
    const { optionOne, optionTwo } = this.state;

    return (
      <div>
        <h3 className='center'>Create new question</h3>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <h4>Complete the question:</h4>
          <h3>Would you rather ...</h3>
          <input
            type='text'
            placeholder='Enter option one text here'
            value={optionOne}
            onChange={this.handleChangeOptionOne}
          />
          <h4><u>OR</u></h4>
          <input
            type='text'
            placeholder='Enter option two text here'
            value={optionTwo}
            onChange={this.handleChangeOptionTwo}
          />
          <button
            className='btn'
            type='submit'
            disabled={optionOne === '' || optionTwo === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))
