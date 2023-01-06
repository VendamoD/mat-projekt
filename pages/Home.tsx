import { Homepage } from '../components/Home'
import { useUserContext } from '../components/userContext'
import Login from './Login'


export default function Home() {
  const {isLoggedIn} = useUserContext()
  if(!isLoggedIn) {
    return <Login/>
  }

  return (
    <>
      <Homepage />
    </>
  )
}
