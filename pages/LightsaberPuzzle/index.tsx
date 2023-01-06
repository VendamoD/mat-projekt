import { Lightsaber } from "../../components/Lightsaber"
import { useUserContext } from '../../components/userContext'
import Login from '../Login'

export default function Match() {

  const {isLoggedIn} = useUserContext()

  if(!isLoggedIn) {
    return <Login/>
  }

  return (
    <>
      <Lightsaber />

    </>
  )
}
