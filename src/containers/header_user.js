import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar, Badge, Popover } from 'antd'
import { nameCharacterSelector } from '../reducers/me'
import { bindActionCreators } from 'redux'
import * as loginActions from '../actions/login'

const HeaderUser = (props) => (
  <Popover
    placement="bottom"
    content={
      <React.Fragment>
        <p>
          <Link to="/profile">Profilim</Link>
        </p>
        <p>
          <Link to="/profile/entrys">Entrylerim</Link>
        </p>
        <p>
          <Link to="/profile/favorites">Favorilerim</Link>
        </p>
        <p>
          <Badge
            dot={props.me.info.messageCount > 0 ? true : false}
            status={props.me.info.messageCount > 0 ? 'success' : ''}
          >
            <Link to="/profile/messages">Mesajlarım</Link>
          </Badge>
        </p>
        <p>
          <Badge
            dot={props.me.info.eventCount > 0 ? true : false}
            status={props.me.info.eventCount > 0 ? 'success' : ''}
          >
            <Link to="/profile/events">Olaylar</Link>
          </Badge>
        </p>
        <p onClick={() => props.loginActions.resetAuth()}>Çıkış Yap</p>
      </React.Fragment>
    }
    trigger="click"
  >
    <Badge
      dot={
        props.me.info.eventCount > 0 || props.me.info.messageCount > 0
          ? true
          : false
      }
      status={
        props.me.info.eventCount > 0 || props.me.info.messageCount > 0
          ? 'success'
          : ''
      }
    >
      <Avatar>{props.character}</Avatar>
    </Badge>
  </Popover>
)

const mapStateToProps = (state) => ({
  me: state.me,
  character: nameCharacterSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  loginActions: bindActionCreators(loginActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderUser)
