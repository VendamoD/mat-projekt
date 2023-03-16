import React, { useEffect, useRef, useState } from "react"
import { Alert as ChakraAlert, Text, AlertDescription, AlertIcon, AlertTitle, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, Button, Center, Stack, Link, ListItem, UnorderedList } from "@chakra-ui/react"
import { useUserContext } from "./userContext"
import { useRouter } from 'next/router'

export function PasswordChange() {
    const [error, setError] = useState("")
    const { changePassword } = useUserContext()
    const { getUser } = useUserContext()
    const { isLoggedIn } = useUserContext()
    const [userData, setUserData] = useState()
    const [isError, setIsError] = useState(false)
    const [isSent, setIsSent] = useState(false)
    const [newPassword, setNewPassword] = useState("")

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
                            <AlertTitle >Změna hesla neproběhla úspěšně.</AlertTitle>
                            <AlertDescription>Heslo nesplňuje minimální požadavky</AlertDescription>
                        </ChakraAlert > : <ChakraAlert marginTop={4} status='success'>
                            <AlertIcon />
                            Změna hesla proběhla úspěšně.
                        </ChakraAlert> : ""
                    }
                    <FormLabel>Zadej nové heslo</FormLabel>
                    <UnorderedList>
                        <ListItem fontSize={{base: "16px"}}>Heslo musí obsahovat minimálně 6 znaků</ListItem>
                    </UnorderedList>
                    <Input id="password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} isRequired />
                    <Center>
                        <Button backgroundColor="blue.300" onClick={async (e) => {
                            e.preventDefault()
                            const emailChangeErr = await changePassword(newPassword)
                            if (!emailChangeErr) {
                                setIsError(true)
                            } else {
                                setIsError(false)
                            }
                            setIsSent(true)
                        }}>Změnit heslo</Button>
                    </Center>
                </Stack>
            </Center>
        </>
    )
}