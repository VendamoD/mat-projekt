import React from "react"
import NextLink from "next/link"
import { HStack, LinkBox } from "@chakra-ui/react"
import { useUserContext } from "./userContext"

export function Menu() {
    //const { isLoggedIn } = useUserContext()

    return (
        <>
            <HStack p={6} backgroundColor="#303030" color="white" height="3rem" spacing="24px">
                <LinkBox as={NextLink} href="./Home">
                    Domů
                </LinkBox>
                {/* {
                    isLoggedIn ? "" : <LinkBox as={NextLink} href="./Login">Přihlásit se</LinkBox>
                } */}
                <LinkBox as={NextLink} href="./Profile">
                    Profil
                </LinkBox>
                <LinkBox as={NextLink} href="./AchievementList">
                    Achievementy
                </LinkBox>
            </HStack>

        </>
    )
}



