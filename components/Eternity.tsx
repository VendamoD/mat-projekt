import React, { useEffect, useState } from "react"
import NextLink from "next/link"
import { Box, Image, LinkBox, Text, HStack } from "@chakra-ui/react"
import Login from "../pages/Login"

export function Eternity() {


    return (
        <>
            <svg width="1500px" height="450px" fill="none" stroke="black">
                <path d="m 500 420 l 560 0 l 80 -80 l -320 -320 l -80 0 l -320 320 z " />
            </svg>
            <HStack display="flex">
                <svg height="200" width="600" >
                    <path d="m 10 100 l 160 0 l 80 -80 l -160 0 z  " />
                </svg>
                <svg height="200px" width="400px"  >
                    <rect width="160px" height="80px" />
                </svg>
                <svg height="200px" width="500px">
                    <path d="m 0 100 l 240 0 l -80 -80 l -80 0 z  " />
                </svg>
                <svg height="200px" width="350px">
                    <path d="m 10 160 l 160 0 l -160 -160 z  " />
                </svg>
                <svg height="200px" width="350px">
                    <path d="m 80 160 l 80 0 l 0 -80 l -80 -80 l 0 80 l -80 0 z  " />
                </svg>
                <svg height="200px" width="400px">
                    <path d="m 160 200 l 0 -160 l -80 0 l -80 80 l 80 0 z  " />
                </svg>
                <svg height="200px" width="400px">
                    <path d="m 80 180 l 80 0 l -80 -80 l 80 -80 l -80 0 l -80 80 z" />
                </svg>
            </HStack>
            <HStack display="flex">
                <svg height="350px" width="200px">
                    <path d="m 90 160 l 80 -80 l -80 -80 l -80 80 z  " />
                </svg>
                <svg height="300px" width="200px">
                    <path d="m 80 160 l 80 -80 l -80 -80 l -80 0 l 80 80 l -80 0 z " />
                </svg>
                <svg height="300px" width="200px">
                    <path d="m 0 160 l 80 0 l 0 -80 l 80 0 l -80 -80 l -80 80 z " />
                </svg>
                <svg height="300px" width="200px">
                    <path d="m 80 240 l 0 -80 l 80 -80 l -80 -80 l 0 80 l -80 80 z " />
                </svg>
                <svg height="300px" width="170px">
                    <path d="m 0 200 l 80 -80 l 80 0 l 0 -80 l -80 0 l -80 80 z " />
                </svg>
                <svg height="300px" width="250px">
                    <path d="m 00 200 l 80 0 l 80 -80 l 80 0 l -80 -80 z " />
                </svg>
                <svg height="300px" width="240px">
                    <path d="m 160 200 l 80 0 l -160 -160 l -80 0 z " />
                </svg>
            </HStack>
            
        </>
    )
}