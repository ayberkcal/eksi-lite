import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as userActions from '../actions/user'
import { Avatar } from 'antd'

class User extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      load: false
    }
  }

  componentWillMount() {
    const { getUser } = this.props.userActions
    const { match: { params: { nick } } } = this.props

    getUser({nick: nick}).then(() => {
      this.setState({load: true})
    })
  }

  render() {

    if(!this.state.load){
      return null
    }

    return (
      <div className="pr-normal">
        <Avatar src={this.props.user.picture} size={64}>{this.props.user.nick.charAt(0).toUpperCase()}</Avatar>
        <h1>@{this.props.user.nick}</h1>
        <ul className="meta">
          <li>
            <span className="label">Created: </span>
            <span />
          </li>
          <li>
            <span className="label">Karma: </span>
            <span />
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user
})

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(userActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User)
