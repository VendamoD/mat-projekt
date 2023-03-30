import React, { useEffect, useState } from "react"
import { Alert as ChakraAlert, AlertDescription, AlertIcon, AlertTitle, FormLabel, Input, Button, Center, Stack } from "@chakra-ui/react"
import { useUserContext } from "./userContext"

export function EmailChange() {
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
    
    useEffect(() => {
        if (isLoggedIn) {
            getUserData()
        }
    }, [])


    return (
        <>
            <Center>
                <Stack min-width="235px" paddingTop={10}>
                    { //Pokud nastane error zobrazí chybovou hlášku
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
                        <Button backgroundColor="blue.300" onClick={async (e) => {
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