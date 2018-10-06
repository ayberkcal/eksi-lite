import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as myActions from '../actions/my'
import Skeleton from '../components/skeleton'
import {
  messagesStatusSelector,
  messagesListSelector
} from '../reducers/messages'
import Pagination from '../components/pagination'
import { parse, stringify } from 'query-string'

class MyMessages extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { page } = parse(this.props.location.search)
    const { getMessages } = this.props.myActions

    getMessages({ p: page }).then(() => {})
  }

  pageChange = (page) => {
    const { history, location } = this.props
    const { getMessages } = this.props.myActions

    getMessages({ p: page }).then(() => {
      history.replace({ ...location, search: stringify({ page: page }) })
    })
  }

  render() {
    const { list, status } = this.props

    return (
      <div className="view">
        <div className="topics-pagination">
          <div className="view">
            <Pagination
              defaultCurrent={1}
              current={this.props.messages.page}
              total={this.props.messages.pageTotal}
              onChange={this.pageChange}
              status={status}
            />
          </div>
        </div>
        <div className="message-container">
          {status === 'fetching' && (
            <React.Fragment>
              {Array.from({
                length: 25
              }).map((_, i) => (
                <Skeleton avatar key={i} />
              ))}
            </React.Fragment>
          )}

          {status === 'success' &&
            list.map((message) => (
              <Link to={`/profile/message/${message.RawNick}`} key={message.Id}>
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
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages.list,
  list: messagesListSelector(state),
  status: messagesStatusSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  myActions: bindActionCreators(myActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyMessages)
