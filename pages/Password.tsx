import { PasswordChange } from '../components/ChangePassword'
import { useUserContext } from '../components/userContext'
import Login from './Login'


export default function Password() {
    const { isLoggedIn } = useUserContext()
    if (!isLoggedIn) {
        return <Login />
    }

    return (
        <>
            <PasswordChange />
        </>
    )
}