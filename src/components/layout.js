import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as loginActions from '../actions/login'
import { bindActionCreators } from 'redux'
import { Avatar, Badge, Popover, Divider } from 'antd'
import asyncComponent from '../containers/asyncComponent'
const HeaderUser = asyncComponent(() => import('../containers/header_user'))
const Channels = asyncComponent(() => import('../containers/channels'))

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="normal">
        <div className="header">
          <div className="inner">
            <Link to="/">
              <img
                alt="presentation"
                className="logo"
                src="https://s3.eksiup.com/7ce863569735.png"
              />
            </Link>
            <Link to="/gundem">Gündem</Link>
            <Link to="/bugun">Bugün</Link>
            <Link to="/gundem">Show</Link>
            <Link to="/gundem">Ask</Link>
            <Popover placement="bottom" content={<Channels />}>
              <span className="more">•••</span>
            </Popover>
            <span className="user-dr">
              <HeaderUser />
            </span>
          </div>
        </div>
        <div className="view">{this.props.children}</div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginActions: bindActionCreators(loginActions, dispatch)
})

export default connect(
  null,
  mapDispatchToProps
)(Layout)
