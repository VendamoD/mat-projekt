import { Pentomino } from "../../components/pentomino"
import { useUserContext } from '../../components/userContext'
import Login from '../Login'

export default function Match() {

  const {isLoggedIn} = useUserContext()

  if(!isLoggedIn) {
    return <Login/>
  }

  return (
    <>
      <Pentomino/>

    </>
  )
}
