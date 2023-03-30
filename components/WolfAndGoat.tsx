import React from "react"
import {
    Box,
    Image,
    Button,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    LinkBox,
    useDisclosure,
    Tooltip,
    Center,
} from "@chakra-ui/react"
import { useUserContext } from '../components/userContext'
import NextLink from "next/link"
import { QuestionOutlineIcon } from "@chakra-ui/icons"

export function WolfAndGoat() {
    let leftSide = ["goat", "wolf", "cabbage"]
    let rightSide = [""]
    let alreadyPlaying = false
    let playerSide = "left"

    const modalLostByGoat = useDisclosure()
    const modalLostByWolf = useDisclosure()
    const modalWin = useDisclosure()
    const { updateWolfAndGoat } = useUserContext()
    //přesuneme loď s vlkem na druhou stranu
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
    //přesuneme loď se zelím na druhou stranu
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
    //přesuneme loď s kozou na druhou stranu
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
    //přesuneme loď na druhou stranu bez nákladu
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
    //kontrola hlavolamu, jestli hráč vyřešil hlavolam
    function checkGame() {
        if (alreadyPlaying) {
            if (playerSide == "right" && rightSide.includes("goat") && rightSide.includes("wolf") || playerSide == "right" && rightSide.includes("goat") && rightSide.includes("cabbage")) {
                console.log("game continues")
            } else if (playerSide == "left" && leftSide.includes("goat") && leftSide.includes("wolf") || playerSide == "left" && leftSide.includes("goat") && leftSide.includes("cabbage")) {
                console.log("game continues")
            } else if (leftSide.includes("wolf") && leftSide.includes("goat") || rightSide.includes("wolf") && rightSide.includes("goat")) {
                console.log("game failed")
                modalLostByWolf.onOpen()
            } else if ( leftSide.includes("goat") && leftSide.includes("cabbage") || rightSide.includes("goat") && rightSide.includes("cabbage")) {
                console.log("game failed")
                modalLostByGoat.onOpen()
            }
        }
        if (rightSide.includes("goat") && rightSide.includes("wolf") && rightSide.includes("cabbage")) {
            console.log("game won")
            updateWolfAndGoat()
            modalWin.onOpen()
        }
    }
    //resetování hlavolamu
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
    //zavření okna s hláškou
    function close() {
        modalWin.onClose();
        modalLostByGoat.onClose()
        modalLostByWolf.onClose()
        restart()
    }

    return (
        <>
            <Box width={"60vw"} position="relative" marginLeft="auto" marginRight="auto" display="block" paddingTop="10px">
                <Image className="wolfLeft" id="wolf" src="cartoonWolf.png"></Image>
                <Image className="goatLeft" id="goat" src="cartoonGoat.png" position="absolute"></Image>
                <Image className="cabbageLeft" id="cabbage" src="cartoonCabbage.png" position="absolute"></Image>
                <Image className="boatLeft" src="boat.png" id="boat" position="absolute" ></Image>
                <Image width={"60vw"} className="river" src="river.jpg" ></Image>
            </Box>
            <Center>
                <HStack spacing={{ base: "1vw" }} paddingTop="15px">
                    <Button backgroundColor="blue.300" fontSize={{ base: "1.3rem" }} onClick={() => moveGoat()}>Koza </Button>
                    <Button backgroundColor="blue.300" fontSize={{ base: "1.3rem" }} onClick={() => moveWolf()}>Vlk </Button>
                    <Button backgroundColor="blue.300" fontSize={{ base: "1.3rem" }} onClick={() => moveCabbage()}>Zelí </Button>
                    <Button backgroundColor="blue.300" fontSize={{ base: "1.3rem" }} onClick={() => moveEmpty()}>Prázdný</Button>
                    <Button backgroundColor="blue.300" fontSize={{ base: "1.3rem" }} onClick={() => restart()}>Reset</Button>
                    <Tooltip label="Tvým cílem je dostat na druhý břeh vlka, kozu a zelí. Ale dej pozor, pokud necháš vlka osamotě s kozou, tak ji vlk sežere. A pokud necháš o samotě kozu se zelím, tak koza sní zelí." borderWidth='1px' borderRadius='lg'>
                        <Box fontSize={{ base: "1.3rem" }} marginLeft="50%" borderRadius="1px" marginTop="10px" text-align="center"><QuestionOutlineIcon /></Box>
                    </Tooltip>

                </HStack>
            </Center>
            <Modal closeOnOverlayClick={false} isOpen={modalWin.isOpen} onClose={modalWin.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Gratuluji. Úspěšně jsi dokončil hlavolam.</ModalHeader>
                    <ModalBody>
                        Chceš pokračovat?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} >
                            <LinkBox as={NextLink} href="./Home">
                                NE
                            </LinkBox>
                        </Button>
                        <Button variant='ghost' onClick={() => close()}>ANO</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal closeOnOverlayClick={false} isOpen={modalLostByGoat.isOpen} onClose={modalLostByGoat.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Koza sežrala zelí!</ModalHeader>
                    <ModalBody>
                        Chceš to zkusit znovu?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} >
                            <LinkBox as={NextLink} href="./Home">
                                NE
                            </LinkBox>
                        </Button>
                        <Button variant='ghost' onClick={() => close()}>ANO</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal closeOnOverlayClick={false} isOpen={modalLostByWolf.isOpen} onClose={modalLostByWolf.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Vlk sežral kozu!</ModalHeader>
                    <ModalBody>
                        Chceš to zkusit znovu?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} >
                            <LinkBox as={NextLink} href="./Home">
                                NE
                            </LinkBox>
                        </Button>
                        <Button variant='ghost' onClick={() => close()}>ANO</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            
        </>
    )
}