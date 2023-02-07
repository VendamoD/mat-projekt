import { useUserContext } from '../../components/userContext'
import Login from '../Login'
import { Eternity } from "../../components/Eternity"

export default function EternityPuzzle() {

  const {isLoggedIn} = useUserContext()

  if(!isLoggedIn) {
    return <Login/>
  }

  return (
    <>
      <Eternity />

    </>
  )
}
