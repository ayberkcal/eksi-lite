import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as myActions from '../actions/my'
import Profile from './profile'

class MyFavorites extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      load: false
    }
  }

  componentWillMount() {
    const { getFavoriteEntrys } = this.props.myActions

    getFavoriteEntrys().then(() => {})
  }

  render() {
    return (
      <Profile>
        <div className="entry-normal">fsdfsdf</div>
      </Profile>
    )
  }
}

const mapStateToProps = ({ me }) => ({
  me
})

const mapDispatchToProps = (dispatch) => ({
  myActions: bindActionCreators(myActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFavorites)
