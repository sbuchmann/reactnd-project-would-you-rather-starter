import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Nav from './Nav'
import Home from './Home'
import Error from './Error'
import QuestionPage from './QuestionPage'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Login from './Login'
import LoadingBar from 'react-redux-loading'

import './App.css';

import { handleInitialData } from '../actions/shared'

class App extends Component {
  componentDidMount () {
    const { dispatch, loading } = this.props;
    if (loading === true) {
      dispatch(handleInitialData())
    }
  }
  render() {
    const { users, authedUser } = this.props;
    return (
      <Router basename='/wouldyourather'>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav users={users} authedUser={authedUser} />
            {this.props.loading === true
                ? null
                : <div>
                    <Route path='/' exact component={Login} />
                    <Route path='/home' exact component={Home} />
                    <Route path='/question/:id' component={QuestionPage} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                    <Route path='/error' component={Error} />
                </div>}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser, users }) {
    return {
        users,
        authedUser,
        loading: authedUser === null
    }
}

export default connect(mapStateToProps)(App)
