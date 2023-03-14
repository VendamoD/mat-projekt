import React from "react"
import NextLink from "next/link"
import { HStack, LinkBox } from "@chakra-ui/react"
import { useUserContext } from "./userContext"

export function Menu() {

    return (
        <>
            <HStack p={6} backgroundColor="#303030" color="white" height="3rem" spacing="24px" width={"100vw"}>
                <LinkBox as={NextLink} href="./Home">
                    Domů
                </LinkBox>
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



