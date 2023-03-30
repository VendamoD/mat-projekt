import React, { useEffect, useState } from "react"
import { Card, HStack, Image, Text } from "@chakra-ui/react"
import { useUserContext } from "./userContext"
import Login from "../pages/Login"

interface Puzzle {
  SaberPuzzle?: boolean;
  WolfAndGoatPuzzle?: boolean;
  PentominoPuzzle?: boolean;
  EternityPuzzle?: boolean;
}

interface UserData {
  Puzzles: Puzzle;
}


export function Achievements() {
  const { isLoggedIn } = useUserContext() //Funkce pro zjištění jestli je uživatel přihlášený
  const { getData } = useUserContext() //Funkce pro načtení dat uživatele
  const [userData, setUserData] = useState<UserData>()

  useEffect(() => {
    if (isLoggedIn) {
      getUserData()
    }
  }, [])

  if (!isLoggedIn) { //Pokud uživatel není přihlášen, zobrazí se komponenta pro přihlášení
    return <Login />

  }
  async function getUserData() { //Funkce pro získání uživatelských dat z databáze
    const userData: any = await getData()
    setUserData(userData);
  }

  //Vykreslení achievementů pro jednotlivé hlavolamy, podle toho, zda je uživatel splmil
  return (
    <>
      <HStack spacing="1rem" textAlign="center" display={"flex"} margin={5} borderWidth='1px' borderRadius='lg' overflow='hidden'>
        {
          userData ? userData.Puzzles.SaberPuzzle ? <Card><Image width="30vw" src="trophy.png"></Image><Text fontSize={{ base: "1.1rem" }}>Světelné meče</Text></Card> : "" : ""
        }
        {
          userData ? userData.Puzzles.WolfAndGoatPuzzle ? <Card><Image width="30vw" src="trophy.png"></Image><Text fontSize={{ base: "1.1rem" }}>Vlk, koza a zelí</Text></Card> : "" : ""
        }
        {
          userData ? userData.Puzzles.PentominoPuzzle ? <Card><Image width="30vw" src="trophy.png"></Image><Text fontSize={{ base: "1.1rem" }}>Pentomino hlavolam</Text></Card> : "" : ""
        }
        {
          userData ? userData.Puzzles.EternityPuzzle ? <Card><Image width="30vw" src="trophy.png"></Image><Text fontSize={{ base: "1.1rem" }}>Eternity hlavolam</Text></Card> : "" : ""
        }
      </HStack>
    </>
  )
}
