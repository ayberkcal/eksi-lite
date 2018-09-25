import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Avatar, Badge, Popover } from 'antd'
import { nameCharacterSelector } from '../reducers/me'

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
            <Badge dot={props.me.messageCount >= 1 ? true : false}>
              <Link to="/profile/messages">Mesajlarım</Link>
            </Badge>
          </p>
          <p>
            <Badge dot={props.me.eventCount >= 1 ? true : false}>
              <Link to="/profile/events">Olaylar</Link>
            </Badge>
          </p>
          <p onClick={() => this.props.loginActions.resetAuth()}>Çıkış Yap</p>
        </React.Fragment>
      }
      trigger="click"
    >
      <Badge
        dot={props.me.eventCount >= 1 || props.me.messageCount ? true : false}
      >
        <Avatar>{props.character}</Avatar>
      </Badge>
    </Popover>
)

const mapStateToProps = (state) => ({
  me: state.me,
  character: nameCharacterSelector(state)
})

export default connect(mapStateToProps)(HeaderUser)
