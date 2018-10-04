import asyncComponent from '../containers/asyncComponent'

const User = asyncComponent(() => import('../containers/user'))
const Profile = asyncComponent(() => import('../containers/profile'))
const MyEntrys = asyncComponent(() => import('../containers/my_entrys'))
const MyFavorites = asyncComponent(() => import('../containers/my_favorites'))
const UserEntrys = asyncComponent(() => import('../containers/user_entrys'))
const UserFavorites = asyncComponent(() =>
  import('../containers/user_favorites')
)
const Messages = asyncComponent(() => import('../containers/messages'))
const Message = asyncComponent(() => import('../containers/message'))
const Events = asyncComponent(() => import('../containers/events'))
const Channels = asyncComponent(() => import('../containers/channels'))
const Today = asyncComponent(() => import('../containers/today_topics'))
const Popular = asyncComponent(() => import('../containers/popular_topics'))
const Settings = asyncComponent(() => import('../containers/settings'))
const Channel = asyncComponent(() => import('../containers/channel'))

export NotFound from '../components/notfound'
export Home from '../components/home'

export {
  User,
  Profile,
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
  Channel
}
