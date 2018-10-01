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
    const { list, isFetched } = this.props
    if (!isFetched) {
      return <div className="entry-normal ">
        <Skeleton loading={true} active avatar />
      </div>
    }

    return (
      <div className="message-container">
        {list.map((message) => (
          <Link to={`/profile/message/${message.Id}`} key={message.Id}>
            <div
              className={`message-normal ${
                message.Unread ? 'active' : 'default'
              }`}
            >
              <h3>
                @{message.RawNick}
                &nbsp;&nbsp;
                <small>{message.LastUpdateFormatted} yazdı</small>
              </h3>
              <span>{message.Summary} </span>
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
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
