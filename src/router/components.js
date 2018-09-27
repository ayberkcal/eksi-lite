import asyncComponent from '../containers/asyncComponent'

const User = asyncComponent(() => import('../containers/user'))
const Profile = asyncComponent(() => import('../containers/profile'))
const MyEntrys = asyncComponent(() => import('../containers/my_entrys'))
const MyFavorites = asyncComponent(() => import('../containers/my_favorites'))

export NotFound from '../components/notfound'
export Home from '../components/home'

export { User, Profile, MyEntrys, MyFavorites }
