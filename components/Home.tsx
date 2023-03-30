import React, { useEffect, useState } from "react"
import NextLink from "next/link"
import { Image, LinkBox, Text, Grid, GridItem, Center } from "@chakra-ui/react"
import { useUserContext } from "./userContext"

interface Puzzle {
  SaberPuzzle?: boolean;
  WolfAndGoatPuzzle?: boolean;
  PentominoPuzzle?: boolean;
  EternityPuzzle?: boolean;
}

interface UserData {
  Puzzles: Puzzle;
}

export function Homepage() {
  const { getData } = useUserContext()
  const [userData, setUserData] = useState<UserData>()

  async function getUserData() {
    const userData: any = await getData()
    setUserData(userData);
    console.log(userData.Puzzles)
  }

  useEffect(() => {
    getUserData()
  }, [])
  return (
    <>
      <Grid paddingLeft="20px" margin="auto" templateColumns={{ xl: "repeat(3, 1fr)", lg: "repeat(2, 1fr)", md: "repeat(2, 1fr)", sm: "repeat(1, 1fr)", }}>
        <GridItem p={7} textAlign="center" width="sm" borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <LinkBox as={NextLink} href="./LightsaberPuzzle">

          {
            userData && userData.Puzzles.SaberPuzzle && "Hotovo"
          }
            <Center>
              <Image alt="" width="20vw" src="lightsaberThumbnail.jpg" />
            </Center>
            <Text>Světelné meče</Text>
          </LinkBox>
        </GridItem>
        <GridItem p={4} textAlign="center" width="sm" borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <LinkBox as={NextLink} href="./WolfAndGoatPuzzle">
            {
              userData ? userData.Puzzles.WolfAndGoatPuzzle ? "Hotovo" : "" : ""
            }
            <Center>
              <Image alt="" width="15vw" float="left" src="GoatAndWolf.png" />
            </Center>
            <Text>Vlk, koza a zelí</Text>
          </LinkBox>
        </GridItem>
        <GridItem p={5} textAlign="center" width="sm" float="left" borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <LinkBox as={NextLink} href="./PentominoPuzzle">
            {
              userData ? userData.Puzzles.PentominoPuzzle ? "Hotovo" : "" : ""
            }
            <Center>
              <Image alt="" width="20vw" src="pentominoThumbnail.png" />
            </Center>
            <Text>Pentomino hlavolam</Text>
          </LinkBox>
        </GridItem>
        <GridItem p={5} textAlign="center" width="sm" float="left" borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <LinkBox as={NextLink} href="./EternityPuzzle">
            {
              userData ? userData.Puzzles.EternityPuzzle ? "Hotovo" : "" : ""
            }
            <Center>
              <Image alt="" width="20vw" src="eternityThumbnail.png" />
            </Center>
            <Text>Eternity hlavolam</Text>
          </LinkBox>
        </GridItem>
      </Grid>
    </>
  )
}
