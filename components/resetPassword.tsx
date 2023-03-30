import React, { useEffect, useState } from "react"
import { Alert as ChakraAlert, AlertIcon, AlertTitle, FormLabel, Input, Button, Center, Stack } from "@chakra-ui/react"
import { useUserContext } from "./userContext"

export function PasswordReset() {
    const { resetPassword } = useUserContext()
    const { getUser } = useUserContext()
    const { isLoggedIn } = useUserContext()
    const [userData, setUserData] = useState()
    const [isError, setIsError] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [newEmail, setNewEmail] = useState("")

    async function getUserData() {
        if (isLoggedIn) {
            const userData: any = await getUser()
            setUserData(userData);

        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            getUserData()
        }
    }, [isLoggedIn])


    return (
        <>
            <Center>
                <Stack min-width="235px" paddingTop={10}>
                    {
                        isSent ? isError ? <ChakraAlert marginTop={4} status='error'>
                            <AlertIcon />
                            <AlertTitle >Zadal jsi špatný email!</AlertTitle>
                        </ChakraAlert > : <ChakraAlert marginTop={4} status='success'>
                            <AlertIcon />
                            Email byl odeslán!
                        </ChakraAlert> : ""
                    }
                    <FormLabel>Zadej email od svého účtu</FormLabel>
                    <Input id="email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} isRequired />
                    <Center>
                        <Button backgroundColor="blue.300" onClick={async (e) => {
                            e.preventDefault()
                            const emailChangeErr = await resetPassword(newEmail)
                            if (!emailChangeErr) {
                                setIsError(true)
                            } else {
                                setIsError(false)
                            }
                            setIsSent(true)
                        }}>Resetuj heslo</Button>
                    </Center>
                </Stack>
            </Center>
        </>
    )
}