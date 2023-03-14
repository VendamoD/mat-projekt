import React, { useEffect, useState } from "react"
import { Card, HStack, Image, Text } from "@chakra-ui/react"
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
      <HStack spacing="175px" textAlign="center" display={"flex"} margin={5} maxW='lm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        {
          //@ts-ignore
          userData ? userData.SaberPuzzle ? <Card maxW='sm'><Image src="trophy.png"></Image><Text>Světelné meče</Text></Card> : "" : ""
        }
        {
          //@ts-ignore
          userData ? userData.WolfAndGoatPuzzle ? <Card maxW='sm'><Image src="trophy.png"></Image><Text>Vlk, koza a zelí</Text></Card> : "" : ""
        }
        {
          //@ts-ignore
          userData ? userData.PentominoPuzzle ? <Card maxW='sm'><Image src="trophy.png"></Image><Text>Pentomino hlavolam</Text></Card> : "" : ""
        }
      </HStack>
      <HStack spacing="175px" textAlign="center" display={"flex"} margin={5} maxW='lm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        {
          //@ts-ignore
          userData ? userData.EternityPuzzle ? <Card maxW='sm'><Image src="trophy.png"></Image><Text>Eternity hlavolam</Text></Card> : "" : ""
        }
      </HStack>
    </>
  )
}
