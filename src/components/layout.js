import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as loginActions from '../actions/login'
import { bindActionCreators } from 'redux'
import { Avatar, Badge, Popover, Divider } from 'antd'

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
            <Popover
              placement="bottom"
              content={
                <React.Fragment>
                  <Link to="/takip">Takip</Link>
                </React.Fragment>
              }
            >
              <span className="more"> ...</span>
            </Popover>
            <span className="user-dr">
              <Popover
                placement="bottom"
                content={
                  <React.Fragment>
                    <p> Entrylerim </p>
                    <p> Favorilerim </p>
                    <p>
                      Mesajlarım
                      <Badge
                        count={109}
                        style={{ backgroundColor: '#52c41a', marginLeft: 5 }}
                      />
                    </p>
                    <p onClick={() => this.props.loginActions.resetAuth()}>
                      Çıkış Yap
                    </p>
                  </React.Fragment>
                }
                trigger="click"
              >
                <Badge dot>
                  <Avatar>U</Avatar>
                </Badge>
              </Popover>
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
