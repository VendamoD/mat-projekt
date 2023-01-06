import React, { useState } from "react"
import { Alert as Text, Button, Center, Stack, Box } from "@chakra-ui/react"
import { useUserContext } from "./userContext"

export function Dashboard() {
  const [error, setError] = useState("")
  const { logout } = useUserContext()
  //const { currentUser, logout } = useAuth()

  async function handleLogout() {
    setError("")
  }

  return (
    <>
      <Center>
        <Stack>
          <Box></Box>
          <Button variant="link" onClick={logout}>
            Log Out
          </Button>
        </Stack>
      </Center>

    </>
  )
}
