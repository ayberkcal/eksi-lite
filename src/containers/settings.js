import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import * as myActions from '../actions/my'
import { Skeleton, List, Icon, Button } from 'antd'
import { eventsListSelector, fetchedEventsSelector } from '../reducers/me'

class MySettings extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {}

  render() {
    const { settings } = this.props

    return (
      <div className="view">
        <div className="events-container">
          <Skeleton loading={true} active avatar />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  settings: state.settings
})

const mapDispatchToProps = (dispatch) => ({
  myActions: bindActionCreators(myActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MySettings)
