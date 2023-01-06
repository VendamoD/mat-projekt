import { Dashboard } from '../components/Dashboard'
import { useUserContext } from '../components/userContext'
import Login from './Login'


export default function Profile() {
  const {isLoggedIn} = useUserContext()
  if(!isLoggedIn) {
    return <Login/>
  }

  return (
    <>
      <Dashboard />
    </>
  )
}
