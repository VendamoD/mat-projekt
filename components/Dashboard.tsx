import React, { useEffect, useState } from "react"
import {
  Alert as ChakraAlert, Text, Button, Center, Stack, Box, Card, FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Link
} from "@chakra-ui/react"
import { useUserContext } from "./userContext"
import NextLink from "next/link"
import Login from "../pages/Login"

export function Dashboard() {
  //const [error, setError] = useState("")
  const { logout } = useUserContext()
  const { getUser } = useUserContext()
  const { isLoggedIn } = useUserContext()
  const [userData, setUserData] = useState()
  const [userEmail, setUserEmail] = useState()

  if (!isLoggedIn) {
    return <Login />
  }
  async function getUserData() {
    if (isLoggedIn) {
      const userData: any = await getUser()
      setUserEmail(userData.email)
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
        <Stack width="235px" paddingTop={10}>
          <FormLabel>Tvůj současný email:</FormLabel>
          <Input type="text" readOnly value={userEmail || ''}></Input>
          <Text>
            Chceš změnit{' '}
            <Link as={NextLink} color='blue.500' href="./Email" >email{' '}</Link>
            nebo{' '}
            <Link as={NextLink} color='blue.500' href="./Password" >heslo</Link>?
          </Text>
          <Button onClick={logout}>
            Odhlásit se
          </Button>
        </Stack>
      </Center>
    </>
  )
}

