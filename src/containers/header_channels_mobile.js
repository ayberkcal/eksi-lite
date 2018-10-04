import React from 'react'
import { Drawer } from 'antd'
import { Link } from 'react-router-dom'
import { getChannels } from '../actions/channels'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Loader from './../components/loader'
import {
  fetchedChannelsSelector,
  channelsPriortySelector
} from '../reducers/channels'

class HeaderChannelsMobile extends React.Component {
  state = { visible: false }

  componentDidMount() {
    if (!this.props.isFetched) {
      const { getChannels } = this.props
      getChannels()
    }
  }

  showDrawer = () => {
    this.setState({
      visible: true
    })
  }

  onClose = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    return (
      <React.Fragment>
        <span className="more" onClick={this.showDrawer}>
          •••
        </span>
        <Drawer
          title="Kanallar"
          placement="bottom"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
         height={290}
        >
          <div className="mobile-channels-body">
            {!this.props.isFetched && <Loader size={16} color="#81c14b" />}
            {this.props.isFetched && (
              <React.Fragment>
                {this.props.list.map((channel) => (
                  <p key={channel.Id}>
                    <Link to={`/channel/${channel.Name}`}>
                      {channel.DisplayName}
                    </Link>
                  </p>
                ))}
                <p>
                  <Link to={`/channels`}> #tümü</Link>
                </p>
              </React.Fragment>
            )}
          </div>
        </Drawer>
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
)(HeaderChannelsMobile)
