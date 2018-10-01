import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as myActions from '../actions/my'
import { Skeleton, List, Icon, Button } from 'antd'
import { eventsListSelector, fetchedEventsSelector } from '../reducers/me'

class MyEvents extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loadmore: false,
      page: 1
    }
  }

  componentWillMount() {
    const { getEvents } = this.props.myActions

    getEvents().then(() => {})
  }

  render() {
    const { list, isFetched } = this.props

    if (!isFetched) {
      return (
        <div className="entry-normal ">
          <Skeleton loading={true} active avatar />
        </div>
      )
    }

    return (
      <div className="view">
        <div className="events-container">
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  events: state.me.events,
  list: eventsListSelector(state),
  isFetched: fetchedEventsSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  myActions: bindActionCreators(myActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyEvents)
