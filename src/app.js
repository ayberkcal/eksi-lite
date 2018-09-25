import React from 'react'
import ReactDOM from 'react-dom'
import { Store, History } from './store'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import './assets/css/styles.scss'
import Gate from './components/gate'
import App from './router'

ReactDOM.render(
  <Provider store={Store}>
    <ConnectedRouter history={History}>
      <Gate>
        <App />
      </Gate>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
)
