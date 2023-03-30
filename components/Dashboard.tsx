import React, { useEffect, useState } from "react"
import {
  Alert as Text, 
  Button, 
  Center, 
  Stack,
  FormLabel,
  Input,
  Link
} from "@chakra-ui/react"
import { useUserContext } from "./userContext"
import NextLink from "next/link"

export function Dashboard() {
  const { logout } = useUserContext()
  const { getUser } = useUserContext()
  const { isLoggedIn } = useUserContext()
  const [userData, setUserData] = useState()
  const [userEmail, setUserEmail] = useState()

  async function getUserData() {
    if (isLoggedIn) {
      const userData: any = await getUser()
      setUserEmail(userData.email)
      setUserData(userData);
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      <Center>
        <Stack width="18vw" paddingTop={10}>
          <FormLabel>Tvůj současný email:</FormLabel>
          <Input type="text" readOnly value={userEmail || ''}></Input>
          <Text background="white">
            Chceš změnit
            <Link margin={1} as={NextLink} color='blue.500' href="./Email" >email</Link>
            nebo
            <Link margin={1} as={NextLink} color='blue.500' href="./Password" >heslo</Link>?
          </Text>
          <Text background="white">
            <Link margin={1} as={NextLink} color='blue.500' href="./ResetPassword">Resetovat heslo</Link>
          </Text>
          <Button backgroundColor="blue.300" onClick={logout}>
            Odhlásit se
          </Button>
        </Stack>
      </Center>
    </>
  )
}

