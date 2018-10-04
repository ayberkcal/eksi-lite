import React from 'react'
import { NavLink } from 'react-router-dom'
import asyncComponent from '../containers/asyncComponent'
const HeaderUser = asyncComponent(() => import('../containers/header_user'))
const HeadChannels = asyncComponent(() => import('./channel_head'))

export default (props) => {
  return (
    <div className="normal">
      <div className="header">
        <div className="inner">
          <NavLink to="/">
            <img
              alt="presentation"
              className="logo"
              src="https://s3.eksiup.com/7ce863569735.png"
            />
          </NavLink>
          <div className="nav-links">
            <NavLink
              exact={true}
              to="/popular"
              activeClassName={'active-link'}
            >
              Gündem
            </NavLink>
            <NavLink
              exact={true}
              to="/today"
              activeClassName={'active-link'}
            >
              Bugün
            </NavLink>
          </div>
          <HeadChannels />
          <span className="user-dr">
            <HeaderUser />
          </span>
        </div>
      </div>
      {props.children}
    </div>
  )
}
