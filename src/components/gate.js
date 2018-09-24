import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Layout from './layout'
import Auth from '../containers/auth'

const Gate = (props) => {
          
    return <React.Fragment>
        {props.auth.isAuth ? <Layout {...props} /> : <Auth {...props} />}
      </React.Fragment>
}

const mapStateToProps = ({ auth }) => ({
    auth
})


export default withRouter(connect(mapStateToProps)(Gate))