import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    LinkBox,
    HStack,
    Tooltip,
    Center,
} from "@chakra-ui/react";
import NextLink from "next/link"
import React, { useEffect, useState } from "react"
import allPentominos, { canPlacePentomino, emptyPlayarea, rotatePentomino } from "../lib/pentominos";
import { useUserContext } from './userContext'

export function Pentomino() {
    const modal = useDisclosure()

    const [pentominoes, setPentominoes] = useState(allPentominos);
    const [pentonimoUsed, setPentonimoUsed] = useState(pentominoes.map(x => false))
    const [playArea, setPlayArea] = useState(emptyPlayarea);
    const [displayArea, setDisplayArea] = useState([...playArea])
    const [selectedPentomino, setSelectedPentomino] = useState(0)
    const [[x, y], setOver] = useState([-1, -1]);

    const { updatePentomino } = useUserContext()

    function checkGame(playArea: number[][]) {
        var found = false
        for (let i = 0; i < playArea.length; i++) {
            for (let j = 0; j < playArea[i].length; j++) {
                if (playArea[i][j] == 0) {
                    found = true
                }
            }
        }
        if (!found) {
            console.log("Game won")
            updatePentomino()
            modal.onOpen()
        }
    }
    function keyDown(e: React.KeyboardEvent<HTMLDivElement>, index: number) {
        if (e.key == "r") {
            setPentominoes([...pentominoes.slice(0, index), rotatePentomino(pentominoes[index]), ...pentominoes.slice(index + 1)])
        }
        if (e.key == "f") {
            setPentominoes([...pentominoes.slice(0, index), flip(pentominoes[index]), ...pentominoes.slice(index + 1)])
        }
    }

    function flip(pentomino: number[][]) {
        pentomino.reverse()
        return pentomino
    }

    function reset() {
        setPlayArea([...emptyPlayarea])
        setDisplayArea([...emptyPlayarea])
        setPentominoes([...allPentominos])
        setPentonimoUsed(allPentominos.map(x => false))
        setOver([-1, -1])
        setSelectedPentomino(0)
    }

    useEffect(() => {
        console.table(playArea)
        checkGame(playArea)
    }, [playArea])

    function applyPentomino(area: number[][], pentomino: number[][], value: number) {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (pentomino[i][j] > 0)
                    area[i - 2 + x][j - 2 + y] = value
            }
        }
        return area;
    }

    function tryPlacePentomino(real: boolean) {
        if (real) setSelectedPentomino(0);
        if (x < 0) return;
        if (y < 0) return;
        if (selectedPentomino < 1) return;

        const pentomino = pentominoes[selectedPentomino - 1];

        if (canPlacePentomino(playArea, pentomino, x, y)) {
            var area = applyPentomino(playArea.map(x => [...x]), pentomino, selectedPentomino);

            if (real) {
                console.log("placing")
                setPlayArea(area)

                pentonimoUsed[selectedPentomino - 1] = true
                setPentonimoUsed([...pentonimoUsed])
                setOver([-1, -1]);
            }
            setDisplayArea(area)
        }
    }

    function movePentomino(x: number, y: number, pentominoValue: number) {
        if (pentominoValue <= 0) return;
        if (selectedPentomino > 0) return;

        console.log('moving', pentominoValue)

        setSelectedPentomino(pentominoValue)

        const newPlayarea = playArea.map(x => x.map(y => y == pentominoValue ? 0 : y));
        setPlayArea(newPlayarea);
        setDisplayArea(newPlayarea);

        pentonimoUsed[pentominoValue - 1] = false
        setPentonimoUsed([...pentonimoUsed])

        setOver([x, y]);
    }

    function select(i: number) {
        if (selectedPentomino > 0) return;
        setSelectedPentomino(i)
    }

    useEffect(() => {
        console.log(x, y, selectedPentomino)
        setDisplayArea(playArea);
        if (x < 0) return;
        if (y < 0) return;
        if (selectedPentomino < 1) return;
        tryPlacePentomino(false)
    }, [x, y])

    function close() {
        modal.onClose()
        reset()
    }

    return (
        <>
            <Tooltip width="20vw" label="Pomocí kláves R a F otáčej dílky a potom je přetáhni do hracího pole. Tvým úkolem je poskládat do pole všechny díky tak, aby ti žádný nezůstal." borderWidth='1px' borderRadius='lg'>
                <Box marginLeft="50%" minWidth="6rem" fontSize={{ base: "20px" }} width="8vw" borderRadius="1px" marginTop="10px" backgroundColor="blue.500" textAlign="center"> Jak hrát    <QuestionOutlineIcon /></Box>
            </Tooltip>
            <Center>
                <Box width="50vw" height="50vh" padding={5} id="grid" style={{ gridTemplateColumns: `repeat(${playArea[0].length}, 1fr)`, gridTemplateRows: `repeat(${playArea.length}, 1fr)` }}>
                    {displayArea.map((row, rowIndex) => row.map((cell, i) => (
                        <div key={i} draggable="true"
                            className={"block p" + cell}
                            onDragEnter={() => setOver([rowIndex, i])}
                            onDragLeave={() => setOver([-1, -1])}
                            onDragStart={() => movePentomino(rowIndex, i, cell)}
                            onDrop={() => tryPlacePentomino(true)}
                            onDragEnd={() => tryPlacePentomino(true)}
                            onDragOver={e => e.preventDefault()}>
                        </div>
                    )))}
                </Box>
            </Center>
            <Box className="toolbox" >
                {pentominoes.map((pentomino, i) => (
                    <>
                        {!pentonimoUsed[i] &&
                            <Box key={`p${i}`}
                                className="pentomino"
                                draggable="true"
                                tabIndex={i} onMouseEnter={e => e.currentTarget.focus()} onKeyDown={e => keyDown(e, i)}
                                onDragStart={() => select(i + 1)}>
                                {pentomino.map((row, indexRow) => row.map((cell, cellColumn) => (
                                    <>
                                        {!!cell &&
                                            <div
                                                className={"block p" + (i + 1)}
                                                style={{ gridRow: indexRow + 1, gridColumn: cellColumn + 1 }}
                                                key={`px${i};${indexRow};${cellColumn}`}>
                                            </div>
                                        }
                                    </>
                                )))}
                            </Box>}
                    </>
                ))}
            </Box>
            <Modal closeOnOverlayClick={false} isOpen={modal.isOpen} onClose={modal.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Gratuluji. Úspěšně jsi dokončil hlavolam.</ModalHeader>
                    <ModalBody>
                        Chceš hrát znovu?
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
            <HStack paddingLeft={"50%"} paddingTop="10px">
                <Button backgroundColor="blue.500" fontSize={{ base: "24px" }} onClick={() => reset()}>restart</Button>
            </HStack>
        </>
    )
}