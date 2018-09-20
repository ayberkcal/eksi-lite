import React from 'react'
import ReactDOM from 'react-dom'
import { Store, History } from './store'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import './assets/css/index.scss'
import Layout from './components/layout'
import App from './router'

ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={History}>
      <Layout>
        <App />
      </Layout>
    </ConnectedRouter>
</Provider>, document.getElementById('app'))
