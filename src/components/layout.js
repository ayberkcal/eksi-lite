import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as loginActions from '../actions/login'
import { bindActionCreators } from 'redux'
import { Avatar, Badge, Popover, Divider } from 'antd'
import asyncComponent from '../containers/asyncComponent'
const HeaderUser = asyncComponent(() => import('../containers/header_user'))
const HeadChannels = asyncComponent(() => import('../containers/header_channels'))

export default (props) => {
    return <div className="normal">
        <div className="header">
          <div className="inner">
            <Link to="/">
              <img alt="presentation" className="logo" src="https://s3.eksiup.com/7ce863569735.png" />
            </Link>
            <div className="nav-links">
              <Link to="/popular?page=1">Gündem</Link>
              <Link to="/today?page=1">Bugün</Link>
            </div>
          <Popover placement="bottom" content={<HeadChannels />}>
              <span className="more">•••</span>
            </Popover>
            <span className="user-dr">
              <HeaderUser />
            </span>
          </div>
        </div>
        {props.children}
      </div>
}

// todo: children