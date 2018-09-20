import React from 'react'
import { Flex, Card, Text, Image } from 'rebass'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import * as loginActions from '../actions/login'

class Auth extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        username: '',
        password: ''
    }
  }

  render() {
    
    const { loginActions } = this.props

    return(
      <Flex>
            <Card
                width={[ 356, 420 ]}
                mx='auto'
                p={3}
                variant='basic'>
                
                <input type="text" defaultValue={this.state.username} onChange={(e) => this.setState({ username: e.target.value})} />
                <input type="password" defaultValue={this.state.password} onChange={(e) => this.setState({ password: e.target.value})} />
                <br/>
                <button onClick={() => loginActions.loginSubmit(this.state)}> Giriş Yap </button>
            </Card>
    </Flex>
    ) 
          
  }
} 


const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActions, dispatch)
})

export default connect(null, mapDispatchToProps)(Auth)