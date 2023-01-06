import { useUserContext } from '../../components/userContext'
import Login from '../Login'
import { WolfAndGoat } from "../../components/WolfAndGoat"

export default function Home() {
  const {isLoggedIn} = useUserContext()
  
  if(!isLoggedIn) {
    return <Login/>
  }

  return (
    <>
      <WolfAndGoat />
    </>
  )
}
