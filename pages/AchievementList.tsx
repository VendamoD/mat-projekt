import { useUserContext } from '../components/userContext'
import { Achievements } from '../components/Achievements'
import Login from './Login'


export default function Home() {
    const { isLoggedIn } = useUserContext()
      if(!isLoggedIn) {
        return <Login/>
      }

    return (
        <>
            <Achievements />
        </>
    )
}
