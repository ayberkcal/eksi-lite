import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as myActions from '../actions/my'
import { Avatar } from 'antd'

class Profile extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      load: false
    }
  }

  componentWillMount() {
    const { getMe } = this.props.myActions

    getMe().then(() => {
      this.setState({load: true})
    })
  }

  render() {

    if(!this.state.load){
      return null
    }

    return (
      <div className="pr-normal">
        <Avatar src={this.props.me.picture} size={64}>{this.props.me.nick.charAt(0).toUpperCase()}</Avatar>
        <h1>@{this.props.me.nick}</h1>
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

const mapStateToProps = ({ me }) => ({
  me
})

const mapDispatchToProps = (dispatch) => ({
  myActions: bindActionCreators(myActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
