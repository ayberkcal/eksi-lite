import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Loader from './../../components/loader'
import { asyncContentLoading, asyncContentLoaded } from './../../actions/async'

const asyncComponent = (
  getComponent,
  Loading = <Loader color="#fff"/>
) => {
  class AsyncComponent extends PureComponent {
    static Component = null
    static async loadComponent() {
      const { default: Component } = await getComponent()
      AsyncComponent.Component = Component
      return Component
    }

    state = { Component: AsyncComponent.Component }

    async componentWillMount() {
      if (!AsyncComponent.Component) {
        this.props.asyncContentLoading()
        const Component = await AsyncComponent.loadComponent()
        if (this.mounted) {
          this.setState({ Component }, this.props.asyncContentLoaded)
        }
      } else if (!this.state.Component) {
        this.setState({ Component: AsyncComponent.Component })
      }
    }

    componentDidMount() {
      this.mounted = true
    }

    componentWillUnmount() {
      this.mounted = false
    }

    mounted = false

    render() {
      const { Component } = this.state
      if (!Component) {
        return Loading
      }

      const { asyncContentLoaded, asyncContentLoading, ...props } = this.props

      return <Component {...props} />
    }
  }

  return connect(
    null,
    { asyncContentLoaded, asyncContentLoading }
  )(AsyncComponent)
}

export default asyncComponent
