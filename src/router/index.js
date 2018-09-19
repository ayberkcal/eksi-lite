import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { NotFound } from './components'

// Auth(Dashboard)
// <Route exact path="/" component={} />

const App = () => (
    <Switch>
        <Route component={NotFound} />
    </Switch>
)

export default App