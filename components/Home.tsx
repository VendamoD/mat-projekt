import React, { useEffect, useState } from "react"
import NextLink from "next/link"
import { Box, Image, LinkBox, Text, HStack, Button, Link } from "@chakra-ui/react"
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
      <HStack display="flex" paddingLeft="40px" spacing="150px" margin="auto">
        <Box p={5} textAlign="center" width="sm" height="lm" borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <LinkBox as={NextLink} href="./LightsaberPuzzle">
            {
              //@ts-ignore
              userData ? userData.SaberPuzzle ? "Hotovo" : "" : ""
            }
            <Image src="lightsaberThumbnail.jpg" />
            <Text>Světelné meče</Text>
          </LinkBox>
        </Box>
        <Box p={5} textAlign="center" width="sm" height="lm" borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <LinkBox as={NextLink} href="./WolfAndGoatPuzzle">
            {
              //@ts-ignore
              userData ? userData.WolfAndGoatPuzzle ? "Hotovo" : "" : ""
            }
            <Image height="125px" width="350px" float="left" src="GoatAndWolf.png" />
            <Text>Vlk, koza a zelí</Text>

          </LinkBox>
        </Box>
        <Box p={5} textAlign="center" width="sm" height="lm" float="left" borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <LinkBox as={NextLink} href="./PentominoPuzzle">
            {
              //@ts-ignore
              userData ? userData.PentominoPuzzle ? "Hotovo" : "" : ""
            }
            <Image height="125px" width="350px" src="pentominoThumbnail.png" />
            <Text>Pentomino hlavolam</Text>
          </LinkBox>
        </Box>
        <LinkBox as={NextLink} href="./EternityPuzzle">
          <Image height="125px" width="350px" src="pentominoThumbnail.png" />
        </LinkBox>
      </HStack>
    </>
  )
}
