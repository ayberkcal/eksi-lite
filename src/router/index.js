import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  NotFound,
  Profile,
  User,
  Home,
  MyEntrys,
  MyFavorites
} from './components'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/profile/entrys" component={MyEntrys} />
    <Route exact path="/profile/favorites" component={MyFavorites} />
    <Route exact path="/user/:nick" component={User} />
    <Route component={NotFound} />
  </Switch>
)

export default App
