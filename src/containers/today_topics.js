import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as topicsActions from '../actions/topics'
import Pagination from '../components/pagination'
import Lists from '../components/list'
import { topicsListSelector, topicsStatusSelector } from '../reducers/topics'
import { parse, stringify } from 'query-string'

class Todaytopics extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    const { page } = parse(this.props.location.search)
    const { getTodayTopics } = this.props.topicsActions

    getTodayTopics({ p: page }).then(() => {})
  }

  pageChange = (page) => {
    const { history, location } = this.props
    const { getTodayTopics } = this.props.topicsActions

    getTodayTopics({ p: page }).then(() => {
      history.replace({ ...location, search: stringify({ page: page }) })
    })
  }

  render() {
    const { list, status } = this.props

    return (
      <div className="topics-container">
        <div className="topics-pagination">
          <div className="view">
            <Pagination
              defaultCurrent={1}
              current={this.props.topics.page}
              total={this.props.topics.pageTotal}
              onChange={this.pageChange}
              status={status}
            />
          </div>
        </div>
        <div className="view">
          <div className="topic-list-container">
            <Lists data={list} status={status} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  topics: state.topics,
  list: topicsListSelector(state),
  status: topicsStatusSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  topicsActions: bindActionCreators(topicsActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todaytopics)
