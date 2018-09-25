import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { getChannels } from '../actions/channels'
import Loader from './../components/loader'
import { Divider } from 'antd'
import {
  fetchedChannelsSelector,
  channelsPriortySelector
} from '../reducers/channels'

class Channels extends React.PureComponent {
  componentDidMount() {
    if (!this.props.isFetched) {
      const { getChannels } = this.props
      getChannels()
    }
  }

  render() {
    if (!this.props.isFetched) {
      return <Loader size={16} />
    }
    return (
      <React.Fragment>
        {this.props.list.map((channel) => (
          <p key={channel.Id}>
            <Link to={`/channel/${channel.Name}`}> {channel.DisplayName}</Link>{' '}
          </p>
        ))}
        <Divider />
        <p> 
            <Link to={`/channels`}> Tümü</Link>
        </p>
      </React.Fragment>
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
)(Channels)
