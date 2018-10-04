import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as channelsActions from '../actions/channels'
import { topicsListSelector, topicsStatusSelector } from '../reducers/topics'
import Lists from '../components/list'
import { parse, stringify } from 'query-string'
import Pagination from '../components/pagination'

class Channel extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        const {
            match: { params: { name } }
        } = this.props
        const { page } = parse(this.props.location.search)
        const { getChannel } = this.props.channelsActions

        getChannel(name, {p: page}).then(() => {})
    }

    pageChange = (page) => {
        const { match: { params: { name } } } = this.props
        const { history, location } = this.props
        const { getChannel } = this.props.channelsActions

        getChannel(name, { p: page }).then(() => {
          history.replace({
            ...location,
            search: stringify({ page: page })
          })
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
    channelsActions: bindActionCreators(channelsActions, dispatch)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel)
