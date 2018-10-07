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
  Messages,
  Events,
  Message,
  Channels,
  Today,
  Popular,
  Settings,
  Channel,
  Entrys
} from './components'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/popular" component={Popular} />
    <Route exact path="/today" component={Today} />
    <Route exact path="/channels" component={Channels} />
    <Route exact path="/channel/:name" component={Channel} />
    <Route exact path="/topic/:topic_id" component={Entrys} />
    <Route exact path="/profile" component={Profile} />
    <Route exact path="/profile/settings" component={Settings} />
    <Route exact path="/profile/entrys" component={MyEntrys} />
    <Route exact path="/profile/favorites" component={MyFavorites} />
    <Route exact path="/profile/messages" component={Messages} />
    <Route exact path="/profile/events" component={Events} />
    <Route exact path="/profile/message/:nick" component={Message} />
    <Route exact path="/user/:nick" component={User} />
    <Route exact path="/user/:nick/entrys" component={UserEntrys} />
    <Route exact path="/user/:nick/favorites" component={UserFavorites} />
    <Route component={NotFound} />
  </Switch>
)

export default App
