import React from "react"
import {
    Box,
    Image,
    Button,
    HStack,
    Card,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    LinkBox,
    useDisclosure,
    Tooltip,
} from "@chakra-ui/react"
import { useUserContext } from '../components/userContext'
import NextLink from "next/link"
import { QuestionOutlineIcon } from "@chakra-ui/icons"

export function WolfAndGoat() {
    let leftSide = ["goat", "wolf", "cabbage"]
    let rightSide = [""]
    let alreadyPlaying = false
    let playerSide = "left"

    const modalLost = useDisclosure()
    const modalWin = useDisclosure()
    const { updateWolfAndGoat } = useUserContext()

    function moveWolf() {
        const wolf = document.getElementById("wolf") as HTMLImageElement
        const boat = document.getElementById("boat") as HTMLImageElement

        if (playerSide == "left" && !leftSide.includes("wolf") || playerSide == "right" && !rightSide.includes("wolf")) {
            console.log("you cannot do that")
        } else if (leftSide.includes("wolf")) {
            const wolfIndex = leftSide.indexOf("wolf")
            rightSide.push("wolf")
            leftSide.splice(wolfIndex, 1)
            playerSide = "right"
            wolf.className = "wolfRight"
            boat.className = "boatRight"
            console.log(leftSide)
            console.log(rightSide)
            console.log(playerSide)

        } else if (rightSide.includes("wolf")) {
            const wolfIndex = rightSide.indexOf("wolf")
            leftSide.push("wolf")
            rightSide.splice(wolfIndex, 1)
            playerSide = "left"
            wolf.className = "wolfLeft"
            boat.className = "boatLeft"
            console.log(leftSide)
            console.log(rightSide)
            console.log(playerSide)
        }

        alreadyPlaying = true
        checkGame()
    }
    function moveCabbage() {
        const boat = document.getElementById("boat") as HTMLImageElement
        const cabbage = document.getElementById("cabbage") as HTMLImageElement

        if (playerSide == "left" && !leftSide.includes("cabbage") || playerSide == "right" && !rightSide.includes("cabbage")) {
            console.log("you cannot do that")

        } else if (leftSide.includes("cabbage")) {
            const cabbageIndex = leftSide.indexOf("cabbage")
            rightSide.push("cabbage")
            leftSide.splice(cabbageIndex, 1)
            playerSide = "right"
            cabbage.className = "cabbageRight"
            boat.className = "boatRight"
            console.log(leftSide)
            console.log(rightSide)
            console.log(playerSide)

        } else if (rightSide.includes("cabbage")) {
            const cabbageIndex = rightSide.indexOf("cabbage")
            leftSide.push("cabbage")
            rightSide.splice(cabbageIndex, 1)
            playerSide = "left"
            cabbage.className = "cabbageLeft"
            boat.className = "boatLeft"
            console.log(leftSide)
            console.log(rightSide)
            console.log(playerSide)
        }

        alreadyPlaying = true
        checkGame()
    }

    function moveGoat() {
        const boat = document.getElementById("boat") as HTMLImageElement
        const goat = document.getElementById("goat") as HTMLImageElement

        if (playerSide == "left" && !leftSide.includes("goat") || playerSide == "right" && !rightSide.includes("goat")) {
            console.log("you cannot do that")
        } else if (leftSide.includes("goat")) {
            const goatIndex = leftSide.indexOf("goat")
            rightSide.push("goat")
            leftSide.splice(goatIndex, 1)
            playerSide = "right"
            goat.className = "goatRight"
            boat.className = "boatRight"
            console.log(leftSide)
            console.log(rightSide)
            console.log(playerSide)

        } else if (rightSide.includes("goat")) {
            const goatIndex = rightSide.indexOf("goat")
            leftSide.push("goat")
            rightSide.splice(goatIndex, 1)
            playerSide = "left"
            goat.className = "goatLeft"
            boat.className = "boatLeft"
            console.log(leftSide)
            console.log(rightSide)
            console.log(playerSide)
        }

        alreadyPlaying = true
        checkGame()
    }

    function moveEmpty() {
        const boat = document.getElementById("boat") as HTMLImageElement

        if (playerSide == "right") {
            playerSide = "left"
            boat.className = "boatLeft"
        } else {
            playerSide = "right"
            boat.className = "boatRight"
        }

        checkGame()
        console.log(playerSide)
    }

    function checkGame() {
        if (alreadyPlaying) {
            if (playerSide == "right" && rightSide.includes("goat") && rightSide.includes("wolf") || playerSide == "right" && rightSide.includes("goat") && rightSide.includes("cabbage")) {
                console.log("game continues")
            } else if (playerSide == "left" && leftSide.includes("goat") && leftSide.includes("wolf") || playerSide == "left" && leftSide.includes("goat") && leftSide.includes("cabbage")) {
                console.log("game continues")
            } else if (leftSide.includes("wolf") && leftSide.includes("goat") || leftSide.includes("goat") && leftSide.includes("cabbage")) {
                console.log("game failed")
                modalLost.onOpen()
            } else if (rightSide.includes("wolf") && rightSide.includes("goat") || rightSide.includes("goat") && rightSide.includes("cabbage")) {
                console.log("game failed")
                modalLost.onOpen()
            }
        }
        if (rightSide.includes("goat") && rightSide.includes("wolf") && rightSide.includes("cabbage")) {
            console.log("game won")
            updateWolfAndGoat()
            modalWin.onOpen()
        }
    }

    function restart() {
        const wolf = document.getElementById("wolf") as HTMLImageElement
        const boat = document.getElementById("boat") as HTMLImageElement
        const cabbage = document.getElementById("cabbage") as HTMLImageElement
        const goat = document.getElementById("goat") as HTMLImageElement

        leftSide = ["goat", "wolf", "cabbage"]
        rightSide = [""]
        alreadyPlaying = false
        playerSide = "left"
        wolf.className = "wolfLeft"
        cabbage.className = "cabbageLeft"
        goat.className = "goatLeft"
        boat.className = "boatLeft"
    }

    return (
        <>

            <Tooltip maxW="lm" label="Tvým cílem je dostat na druhý břeh vlka, kozu a zelí. Ale dej pozor, pokud necháš vlka osamotě s kozou, tak ji vlk sežere. A pokud necháš o samotě kozu se zelím, tak koza sní zelí." borderWidth='1px' borderRadius='lg'>
                <Box marginLeft="50%" width="75px" borderRadius="1px" marginTop="10px" backgroundColor="#EDF2F7" text-align="center"> Jak hrát    <QuestionOutlineIcon /></Box>
            </Tooltip>

            <Box height={"600px"} width={"900px"} marginLeft="auto" marginRight="auto" display="block" paddingTop="10px">
                <Image className="river" width="100%" height="100%" src="river.jpg" position="relative" ></Image>
                <Image className="wolfLeft" id="wolf" src="cartoonWolf.png" ></Image>
                <Image className="goatLeft" id="goat" src="cartoonGoat.png"></Image>
                <Image className="cabbageLeft" id="cabbage" src="cartoonCabbage.png"></Image>
                <Image className="boatLeft" src="boat.png" id="boat"></Image>

            </Box>
            <HStack spacing="10px" paddingLeft="600px" paddingTop="15px">
                <Button onClick={() => moveGoat()}>Koza </Button>
                <Button onClick={() => moveWolf()}>Vlk </Button>
                <Button onClick={() => moveCabbage()}>Zelí </Button>
                <Button onClick={() => moveEmpty()}>Přejeď prázdný</Button>
                <Button onClick={() => restart()}>Reset</Button>
            </HStack>

            <Modal isOpen={modalWin.isOpen} onClose={modalWin.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Gratuluji. Úspěšně jsi dokončil hlavolam.</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Chceš pokračovat?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} >
                            <LinkBox as={NextLink} href="./Home">
                                NE
                            </LinkBox>
                        </Button>
                        <Button variant='ghost' onClick={modalWin.onClose}>ANO</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Modal isOpen={modalLost.isOpen} onClose={modalLost.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Je mi líto. Bohužel jsi nevyřešil hlavolam.</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Chceš to zkusit znovu?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} >
                            <LinkBox as={NextLink} href="./Home">
                                NE
                            </LinkBox>
                        </Button>
                        <Button variant='ghost' onClick={modalLost.onClose}>ANO</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}