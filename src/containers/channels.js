import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { getChannels } from '../actions/channels'
import { Skeleton, List, Icon, Button } from 'antd'
import { fetchedChannelsSelector } from '../reducers/channels'

class Channels extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { getChannels } = this.props
    if(!this.props.isFetched){
        getChannels().then(() => {})
    }
    
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
        <div className="channels-container">
        {list.map((channel) => (
          <Link to={`/channel/${channel.Name}`} key={channel.Id}>
            <div className={`events-normal active`}>
              <h3>{channel.DisplayName}</h3>
              <span>{channel.Description}</span>
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  list: state.channels.data,
  isFetched: fetchedChannelsSelector(state)
})

const mapDispatchToProps = (dispatch) => ({
  getChannels: bindActionCreators(getChannels, dispatch)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channels)
