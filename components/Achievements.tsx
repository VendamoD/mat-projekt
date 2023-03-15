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
      <HStack spacing="1rem" textAlign="center" display={"flex"} margin={5} borderWidth='1px' borderRadius='lg' overflow='hidden'>
        {
          //@ts-ignore
          userData ? userData.SaberPuzzle ? <Card><Image width="40vw" src="trophy.png"></Image><Text fontSize={{ base: "1.1rem" }}>Světelné meče</Text></Card> : "" : ""
        }
        {
          //@ts-ignore
          userData ? userData.WolfAndGoatPuzzle ? <Card><Image width="40vw" src="trophy.png"></Image><Text fontSize={{ base: "1.1rem" }}>Vlk, koza a zelí</Text></Card> : "" : ""
        }
        {
          //@ts-ignore
          userData ? userData.PentominoPuzzle ? <Card><Image width="40vw" src="trophy.png"></Image><Text fontSize={{ base: "1.1rem" }}>Pentomino hlavolam</Text></Card> : "" : ""
        }
        {
          //@ts-ignore
          userData ? userData.EternityPuzzle ? <Card><Image width="40vw" src="trophy.png"></Image><Text fontSize={{ base: "1.1rem" }}>Eternity hlavolam</Text></Card> : "" : ""
        }
      </HStack>
    </>
  )
}
