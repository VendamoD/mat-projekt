import React, { useEffect, useState } from "react"
import NextLink from "next/link"
import { Box, Image, LinkBox, Text } from "@chakra-ui/react"
import { useUserContext } from "./userContext"
import Login from "../pages/Login"

export function Homepage() {
  const { isLoggedIn } = useUserContext()
  const { getData } = useUserContext()
  const [userData, setUserData] = useState()


  if (!isLoggedIn) {
    return <Login />

  }
  async function getUserData() {

    const userData: any = await getData()
    setUserData(userData);
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUserData()
    }
  }, [isLoggedIn])


  return (
    <>
      <Box p={5} textAlign="center" maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <LinkBox as={NextLink} href="./LightsaberPuzzle">
          {
            //@ts-ignore
            userData ? userData.SaberPuzzle ? "Hotovo" : "" : ""
          }
          <Image src="lightsaberThumbnail.jpg" />
          <Text>Lightsaber puzzle</Text>

        </LinkBox>
      </Box>
      <Box p={5} textAlign="center" maxW='sm' display={"inline-block"} borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <LinkBox as={NextLink} href="./WolfAndGoatPuzzle">
          {
            //@ts-ignore
            userData ? userData.WolfAndGoatPuzzle ? "Hotovo" : "" : ""
          }
          <Image src="wolfandgoat.jpg" />
          <Text>Wolf and goat puzzle</Text>

        </LinkBox>
      </Box>



    </>
  )
}
