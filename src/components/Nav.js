import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Nav ({users, authedUser}) {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/home' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/leaderboard' activeClassName='active'>
            Leader Board
          </NavLink>
        </li>
        {authedUser && (
          <li>
            <u><span style={{verticalAlign: 'super'}}>{users[authedUser].name}</span></u>
            <img
              src={users[authedUser].avatarURL}
              alt={`Avatar of ${users[authedUser].name}`}
              className='avatarMini' />
          </li>
        )}
        <li>
          <NavLink to='/' activeClassName='active'>
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}