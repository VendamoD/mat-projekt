import { EmailChange } from '../components/ChangeEmail'
import { useUserContext } from '../components/userContext'
import Login from './Login'


export default function Email() {
    const { isLoggedIn } = useUserContext()
    if (!isLoggedIn) {
        return <Login />
    }

    return (
        <>
            <EmailChange />
        </>
    )
}