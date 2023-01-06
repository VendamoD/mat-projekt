import React, { useEffect, useState } from "react"
import { Box, Image, Text } from "@chakra-ui/react"
import { useUserContext } from "./userContext"
import Login from "../pages/Login"

export function Achievements() {
  const { isLoggedIn } = useUserContext()
  const { getData } = useUserContext()
  const [userData, setUserData] = useState()

  useEffect(() => {
    if (isLoggedIn) {
      getUserData()
    }
  }, [])

  if (!isLoggedIn) {
    return <Login />

  }
  async function getUserData() {

    const userData: any = await getData()
    setUserData(userData);
  }




  return (
    <>
      <Box textAlign="center" display={"flex"} margin={5} maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        {
          //@ts-ignore
          userData ? userData.SaberPuzzle ? <Box><Image src="trophy.jpg"></Image><Text>Lightsaber Puzzle</Text></Box> : "" : ""
        }
        {
          //@ts-ignore
          userData ? userData.WolfAndGoatPuzzle ? <Box><Image src="trophy.jpg"></Image><Text>Wolf and Goat Puzzle</Text></Box> : "Nesplnil jsi žádný hlavolam" : ""
        }
      </Box>
    </>
  )
}
