import React, { useEffect, useState } from "react"
import { Alert as ChakraAlert, AlertDescription, AlertIcon, AlertTitle, FormLabel, Input, Button, Center, Stack, ListItem, UnorderedList } from "@chakra-ui/react"
import { useUserContext } from "./userContext"

export function PasswordChange() {
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
                            //zavoláme funkci která změní heslo uživatele v databázi
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