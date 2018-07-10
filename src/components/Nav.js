import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav ({users, authedUser}) {
  if (!authedUser) {
    return <div />
  }
  console.log('X3', users);
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/new' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leader Board
          </NavLink>
        </li>
        <li>
            <u><span style={{verticalAlign: 'super'}}>{users[authedUser].name}</span></u>
            <img
              src={users[authedUser].avatarURL}
              alt={`Avatar of ${users[authedUser].name}`}
              className='avatarMini' />
        </li>
        <li>
          <NavLink to='/logout' activeClassName='active'>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}