import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as myActions from '../actions/my'
import Skeleton from '../components/skeleton'
import { eventsListSelector, eventsStatusSelector } from '../reducers/me'
import Pagination from '../components/pagination'
import { parse, stringify } from 'query-string'

class MyEvents extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loadmore: false,
      page: 1
    }
  }

  componentWillMount() {
    const { page } = parse(this.props.location.search)
    const { getEvents } = this.props.myActions

    getEvents({ p: page }).then(() => {})
  }

  pageChange = (page) => {
    const { history, location } = this.props
    const { getEvents } = this.props.myActions

    getEvents({ p: page }).then(() => {
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
              current={this.props.events.page}
              total={this.props.events.pageTotal}
              onChange={this.pageChange}
              status={status}
            />
          </div>
        </div>
        <div className="events-container">
          {status === 'fetching' && (
            <React.Fragment>
              {Array.from({
                length: 25
              }).map((_, i) => (
                <Skeleton avatar key={i} />
              ))}
            </React.Fragment>
          )}
          {status === 'success' && (
            <React.Fragment>
              {list.map((event) => (
                <Link to={`/topic/${event.TopicId}`} key={event.Snapshot}>
                  <div
                    className={`events-normal ${
                      event.MatchedCount > 0 ? 'active' : 'default'
                    } }`}
                  >
                    <h3>{event.Title}</h3>
                  </div>
                </Link>
              ))}
            </React.Fragment>
          )}
        </div>
      </div>
    )

    return <div className="view" />
  }
}

const mapStateToProps = (state) => ({
  events: state.me.events,
  list: eventsListSelector(state),
  status: eventsStatusSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  myActions: bindActionCreators(myActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyEvents)
