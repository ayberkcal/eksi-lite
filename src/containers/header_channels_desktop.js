import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { getChannels } from '../actions/channels'
import Loader from './../components/loader'
import {
  fetchedChannelsSelector,
  channelsPriortySelector
} from '../reducers/channels'

class HeadChannelsDesktop extends React.PureComponent {
  componentDidMount() {
    if (!this.props.isFetched) {
      const { getChannels } = this.props
      getChannels()
    }
  }

  render() {
    if (!this.props.isFetched) {
      return <Loader size={16} color="#81c14b" />
    }
    return (
      <div className="channels-head">
        {this.props.list.map((channel) => (
          <p key={channel.Id}>
            <Link to={`/channel/${channel.Name}`}> {channel.DisplayName}</Link>{' '}
          </p>
        ))}
        <hr />
        <p>
          <Link to={`/channels`}> #tümü</Link>
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: channelsPriortySelector(state),
  isFetched: fetchedChannelsSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  getChannels: bindActionCreators(getChannels, dispatch)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeadChannelsDesktop)
