import React from 'react'
import { Route, Switch } from 'react-router-dom'
import {
  NotFound,
  Profile,
  User,
  Home,
  MyEntrys,
  MyFavorites,
  UserEntrys,
  UserFavorites,
  Messages
} from './components'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/profile/entrys" component={MyEntrys} />
    <Route exact path="/profile/favorites" component={MyFavorites} />
    <Route exact path="/profile/messages" component={Messages} />
    <Route exact path="/user/:nick" component={User} />
    <Route path="/user/:nick/entrys" component={UserEntrys} />
    <Route path="/user/:nick/favorites" component={UserFavorites} />
    <Route component={NotFound} />
  </Switch>
)

export default App
