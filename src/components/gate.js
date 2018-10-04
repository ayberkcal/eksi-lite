import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Megaera from 'react-megaera'
import Layout from './layout'
import Auth from '../containers/auth'
import Error from './error'

const Gate = (props) => {
  return (
    <Megaera template={<Error />}>
      {props.auth.isAuth ? <Layout {...props} /> : <Auth {...props} />}
    </Megaera>
  )
}

const mapStateToProps = ({ auth }) => ({
  auth
})

export default withRouter(connect(mapStateToProps)(Gate))
