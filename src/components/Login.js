import React, { Component } from 'react'
import { connect } from 'react-redux'

import Question from './Question'
import {setAuthedUser} from "../actions/authedUser";

class Login extends Component {
    state = {
        user: ''
    };

    handleChange = (e) => {
        const value = e.target.value;
        this.setState(() => ({
            user: value
        }))
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { user } = this.state;
        const { dispatch } = this.props;

        dispatch(setAuthedUser(user));

        this.setState(() => ({
            user: ''
        }));

        this.props.history.push(`/home`);
    };

    render () {
        const { user } = this.state;

        return (
            <div>
                <form className='new-question' onSubmit={this.handleSubmit}>
                    <div>
                        <div>
                            <h3>Welcome to the "Would you rather ..." application!</h3>
                        </div>
                        <div>
                            <h4>Please sign in to continue</h4>
                        </div>
                        <div>
                            <select
                                onChange={this.handleChange}>
                                <option value=''>None</option>
                                {this.props.users.map((user, index) => (
                                    <option value={user.id}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                        <br />
                        <div>
                            <button
                                type='submit'
                                disabled={user === ''}>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
  }
}

function mapStateToProps ({ users }) {
    const ids = Object.keys(users)
        .sort((a,b) => (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length));
    const usersArray = [];
    ids.forEach((id) => {
        usersArray[usersArray.length] = users[id];
    });
    return {
        users: usersArray
    }
}

export default connect(mapStateToProps)(Login)
