import React, { useEffect, useRef, useState } from "react"
import { Alert as ChakraAlert, Text, AlertDescription, AlertIcon, AlertTitle, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Center, Stack, Link } from "@chakra-ui/react"
import { useUserContext } from "./userContext"
import { useRouter } from 'next/router'

export function EmailChange() {
    const [error, setError] = useState("")
    const { changeEmail } = useUserContext()
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
    //console.log(userData)

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
                            <AlertTitle >Změna emailu neproběhla úspěšně.</AlertTitle>
                            <AlertDescription>Špatný formát emailu</AlertDescription>
                        </ChakraAlert > : <ChakraAlert marginTop={4} status='success'>
                            <AlertIcon />
                            Změna emailu proběhla úspěšně.
                        </ChakraAlert> : ""
                    }
                    <FormLabel>Zadej nový email</FormLabel>
                    <Input id="email" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} isRequired />
                    <Center>
                        <Button onClick={async (e) => {
                            e.preventDefault()
                            const emailChangeErr = await changeEmail(newEmail)
                            if (!emailChangeErr) {
                                setIsError(true)
                            } else {
                                setIsError(false)
                            }
                            setIsSent(true)
                        }}>Změnit email</Button>
                    </Center>
                </Stack>
            </Center>
        </>
    )
}