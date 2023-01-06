import { useUserContext } from '../components/userContext'
import Login from './Login'

export default function test() {
    const { isLoggedIn } = useUserContext()

    if (!isLoggedIn) {
        return <Login />
    }

    return (<>
            <button></button>
        </>
    )
}
