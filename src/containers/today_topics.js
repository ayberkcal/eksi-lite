import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as topicsActions from '../actions/topics'
import { Skeleton, List, Icon, Button, Pagination } from 'antd'
import { topicsListSelector } from '../reducers/topics'
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

  pageChange = (page, pageSize) => {
    const { history, location } = this.props
    const { getTodayTopics } = this.props.topicsActions

    getTodayTopics({ p: page }).then(() => {
      history.replace({...location, search:stringify({ page: page } ) })
    })
  }

  render() {
    const { list, isFetched } = this.props

    //if (!isFetched) {
    //  return (
    //    <div className="entry-normal ">
    //      <Skeleton loading={true} active avatar />
    //    </div>
    //  )
    //}

    return (
      <div className="topics-container">
        <div className="topics-pagination">
          <div className="view">
          <Pagination
            simple
            defaultCurrent={1}
            current={this.props.topics.page}
            total={this.props.topics.pageTotal}
            onChange={this.pageChange}
          />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  topics: state.topics,
  list: topicsListSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  topicsActions: bindActionCreators(topicsActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Todaytopics)
