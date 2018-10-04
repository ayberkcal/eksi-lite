import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as myActions from '../actions/my'
import Skeleton from '../components/skeleton'
import {
  messageListSelector,
  messageStatusSelector
} from '../reducers/messages'

class MyMessages extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loadmore: false,
      page: 1
    }
  }

  componentWillMount() {
    const {
      match: { params }
    } = this.props
    const { getMessage } = this.props.myActions

    getMessage(params).then(() => {})
  }

  render() {
    const { list, status } = this.props

    if (status === 'fetching') {
      return <Skeleton />
    }

    return <div className="message-container" />
  }
}

const mapStateToProps = (state) => ({
  message: state.messages.message,
  list: messageListSelector(state),
  status: messageStatusSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  myActions: bindActionCreators(myActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMessages)
