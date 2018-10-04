import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Avatar, Badge, Popover, Drawer } from 'antd'
import { nameCharacterSelector } from '../reducers/me'
import { bindActionCreators } from 'redux'
import * as loginActions from '../actions/login'

class HeaderUser extends React.Component {
  state = { visible: false }

  showDrawer = () => {
    this.setState({
      visible: true
    })
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const props = this.props
    return (
      <React.Fragment>
        <div className="popover-desktop">
          <Popover
            placement="bottom"
            content={
              <React.Fragment>
                <p>
                  <NavLink
                    exact={true}
                    activeClassName={'active-link'}
                    to="/profile"
                  >
                    Profilim
                  </NavLink>
                </p>
                <p>
                  <NavLink
                    exact={true}
                    activeClassName={'active-link'}
                    to="/profile/entrys"
                  >
                    Entrylerim
                  </NavLink>
                </p>
                <p>
                  <NavLink
                    exact={true}
                    activeClassName={'active-link'}
                    to="/profile/favorites"
                  >
                    Favorilerim
                  </NavLink>
                </p>
                <p>
                  <Badge
                    dot={props.me.info.messageCount > 0 ? true : false}
                    status={props.me.info.messageCount > 0 ? 'success' : ''}
                  >
                    <NavLink
                      exact={true}
                      activeClassName={'active-link'}
                      to="/profile/messages"
                    >
                      Mesajlarım
                    </NavLink>
                  </Badge>
                </p>
                <p>
                  <NavLink
                    exact={true}
                    activeClassName={'active-link'}
                    to="/profile/settings"
                  >
                    Ayarlar
                  </NavLink>
                </p>
                <p>
                  <Badge
                    dot={props.me.info.eventCount > 0 ? true : false}
                    status={props.me.info.eventCount > 0 ? 'success' : ''}
                  >
                    <NavLink
                      exact={true}
                      activeClassName={'active-link'}
                      to="/profile/events"
                    >
                      Olaylar
                    </NavLink>
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
                  ? 'default'
                  : ''
              }
            >
              <Avatar src={props.me.info.picture}>{props.character}</Avatar>
            </Badge>
          </Popover>
        </div>

        <div className="mobile-drawer">
          <Badge
            dot={
              props.me.info.eventCount > 0 || props.me.info.messageCount > 0
                ? true
                : false
            }
            status={
              props.me.info.eventCount > 0 || props.me.info.messageCount > 0
                ? 'default'
                : ''
            }
          >
            <Avatar src={props.me.info.picture} onClick={this.showDrawer}>
              {props.character}
            </Avatar>
          </Badge>
          <Drawer
            title="Hızlı Erişim"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <React.Fragment>
              <p>
                <NavLink
                  exact={true}
                  activeClassName={'active-link'}
                  to="/profile"
                >
                  Profilim
                </NavLink>
              </p>
              <p>
                <NavLink
                  exact={true}
                  activeClassName={'active-link'}
                  to="/profile/entrys"
                >
                  Entrylerim
                </NavLink>
              </p>
              <p>
                <NavLink
                  exact={true}
                  activeClassName={'active-link'}
                  to="/profile/favorites"
                >
                  Favorilerim
                </NavLink>
              </p>
              <p>
                <Badge
                  dot={props.me.info.messageCount > 0 ? true : false}
                  status={props.me.info.messageCount > 0 ? 'success' : ''}
                >
                  <NavLink
                    exact={true}
                    activeClassName={'active-link'}
                    to="/profile/messages"
                  >
                    Mesajlarım
                  </NavLink>
                </Badge>
              </p>
              <p>
                <Badge
                  dot={props.me.info.eventCount > 0 ? true : false}
                  status={props.me.info.eventCount > 0 ? 'success' : ''}
                >
                  <NavLink
                    exact={true}
                    activeClassName={'active-link'}
                    to="/profile/events"
                  >
                    Olaylar
                  </NavLink>
                </Badge>
              </p>
              <p>
                <NavLink
                  exact={true}
                  activeClassName={'active-link'}
                  to="/profile/settings"
                >
                  Ayarlar
                  </NavLink>
              </p>
              <p onClick={() => props.loginActions.resetAuth()}>Çıkış Yap</p>
            </React.Fragment>
          </Drawer>
        </div>
      </React.Fragment>
    )
  }
}

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
