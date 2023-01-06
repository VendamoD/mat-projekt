import React from "react"
import NextLink from "next/link"
import { HStack, LinkBox } from "@chakra-ui/react"
export function Menu() {
    return (
        <>
            <HStack p={6} backgroundColor="#303030" color="white" height="3rem" spacing="24px">
                <LinkBox as={NextLink} href="./Home">
                    Home
                </LinkBox>
                <LinkBox as={NextLink} href="./Login">
                    Login
                </LinkBox>
                <LinkBox as={NextLink} href="./Profile">
                    Profile
                </LinkBox>
                <LinkBox as={NextLink} href="./AchievementList">
                    Achievements
                </LinkBox>
            </HStack>

        </>
    )
}



