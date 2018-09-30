import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as myActions from '../actions/my'
import { Skeleton, List, Icon, Button } from 'antd'
import {
  fetchedMessagesSelector,
  messagesListSelector
} from '../reducers/messages'
import ShowMore from '../components/show_more'

class MyMessages extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loadmore: false,
      page: 1
    }
  }

  componentWillMount() {
    const { getMessages } = this.props.myActions

    getMessages().then(() => {})
  }

  render() {
    return <div className="entry-normal" />
  }
}

const mapStateToProps = (state) => ({
  messages: state.me.messages,
  list: messagesListSelector(state),
  isFetched: fetchedMessagesSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  myActions: bindActionCreators(myActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMessages)
