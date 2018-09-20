import React from 'react'
import Auth from '../containers/auth'
import { Flex, Box } from 'rebass'
import Header from './header'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class Layout extends React.Component {

  constructor(props) {
    super(props)
  }


  render() {
    return <React.Fragment>
      <Header />
      <Flex>
        <Box
          p={3}
          width={'20%'}>
          Flex
        </Box>
        <Box
          p={3}
          width={'80%'}
          color='white'
          bg='magenta'>
          Box
        </Box>
      </Flex>   
    </React.Fragment>  
  }
} 

const Gate = (props) => {
  return (props.auth.isAuth ? <Layout /> : <Auth />)
}

const mapStateToProps = ({ auth }) => ({
  auth
})


export default withRouter(connect(mapStateToProps)(Gate))