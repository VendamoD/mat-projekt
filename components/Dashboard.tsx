import React, { useEffect, useState } from "react"
import {
  Alert as Text, Button, Center, Stack, Box, Card, FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from "@chakra-ui/react"
import { useUserContext } from "./userContext"
import Login from "../pages/Login"

export function Dashboard() {
  const [error, setError] = useState("")
  const { logout, changeEmail } = useUserContext()
  const { getUser } = useUserContext()
  const { isLoggedIn } = useUserContext()
  const [userData, setUserData] = useState()
  const [userEmail, setUserEmail] = useState()
  const [email, setEmail] = useState()
  //const { currentUser, logout } = useAuth()

  async function handleLogout() {
    setError("")
  }

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
  function getEmailValue() {
    //@ts-ignore
     setEmail(document.getElementById("email").value) 
  }
  console.log(userData)
  useEffect(() => {
    if (isLoggedIn) {
      getUserData()
    }
  }, [isLoggedIn])

  return (
    <>
      <Center>
        <Stack width="235px">
          <Input type="text" readOnly value={userEmail}></Input>
          <FormControl>
            <FormLabel>Zadej nový email</FormLabel>
            <Input id="email" type="email" onBlur={() => getEmailValue()} isRequired />
            <Button type="submit"></Button>
          </FormControl>
          <Button variant="link" onClick={logout}>
            Odhlásit se
          </Button>
          <Button onClick={() => getUser()}>Change Email</Button>
        </Stack>
      </Center>

    </>
  )
}

